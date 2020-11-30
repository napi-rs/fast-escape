#[macro_use]
extern crate napi_derive;

use std::str;

use napi::{CallContext, Env, JsBuffer, JsBufferValue, JsObject, JsString, Ref, Result, Task};
use v_htmlescape::escape;

#[cfg(all(unix, not(target_env = "musl"), not(target_arch = "aarch64")))]
#[global_allocator]
static ALLOC: jemallocator::Jemalloc = jemallocator::Jemalloc;

#[cfg(windows)]
#[global_allocator]
static ALLOC: mimalloc::MiMalloc = mimalloc::MiMalloc;

#[module_exports]
fn init(mut exports: JsObject) -> Result<()> {
  exports.create_named_method("escapeHTML", escape_html)?;
  exports.create_named_method("escapeHTMLBuf", escape_html_buf)?;
  exports.create_named_method("asyncEscapeHTMLBuf", async_escape_html_buf)?;
  Ok(())
}

#[repr(transparent)]
struct EscapeTask(Ref<JsBufferValue>);

impl Task for EscapeTask {
  type Output = String;
  type JsValue = JsString;

  fn compute(&mut self) -> Result<Self::Output> {
    Ok(escape(unsafe { str::from_utf8_unchecked(&self.0) }).to_string())
  }

  fn resolve(self, env: Env, output: Self::Output) -> Result<Self::JsValue> {
    self.0.unref(env)?;
    env.create_string_from_std(output)
  }
}

#[js_function(1)]
fn escape_html(ctx: CallContext) -> Result<JsString> {
  let input = ctx.get::<JsString>(0)?.into_utf8()?;

  ctx
    .env
    .create_string_from_std(escape(input.as_str()?).to_string())
}

#[js_function(1)]
fn escape_html_buf(ctx: CallContext) -> Result<JsString> {
  let input = ctx.get::<JsBuffer>(0)?.into_value()?;
  ctx
    .env
    .create_string_from_std(escape(unsafe { str::from_utf8_unchecked(&input) }).to_string())
}

#[js_function(1)]
fn async_escape_html_buf(ctx: CallContext) -> Result<JsObject> {
  let input = ctx.get::<JsBuffer>(0)?;
  let task = EscapeTask(input.into_ref()?);

  ctx
    .env
    .spawn(task)
    .map(|async_task| async_task.promise_object())
}
