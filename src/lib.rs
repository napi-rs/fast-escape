#[macro_use]
extern crate napi;
#[macro_use]
extern crate napi_derive;

use std::str;

use napi::{CallContext, Env, JsBuffer, JsObject, JsString, Module, Result, Task};
use v_htmlescape::escape;

#[cfg(all(unix, not(target_env = "musl")))]
#[global_allocator]
static ALLOC: jemallocator::Jemalloc = jemallocator::Jemalloc;

#[cfg(windows)]
#[global_allocator]
static ALLOC: mimalloc::MiMalloc = mimalloc::MiMalloc;

register_module!(escape, init);

fn init(module: &mut Module) -> Result<()> {
  module.create_named_method("escapeHTML", escape_html)?;
  module.create_named_method("escapeHTMLBuf", escape_html_buf)?;
  module.create_named_method("asyncEscapeHTMLBuf", async_escape_html_buf)?;
  Ok(())
}

struct EscapeTask<'env>(&'env [u8]);

impl<'env> Task for EscapeTask<'env> {
  type Output = String;
  type JsValue = JsString;

  fn compute(&mut self) -> Result<Self::Output> {
    Ok(escape(unsafe { str::from_utf8_unchecked(self.0) }).to_string())
  }

  fn resolve(&self, env: &mut Env, output: Self::Output) -> Result<Self::JsValue> {
    env.create_string_from_std(output)
  }
}

#[js_function(1)]
fn escape_html(ctx: CallContext) -> Result<JsString> {
  let input = ctx.get::<JsString>(0)?;

  ctx
    .env
    .create_string_from_std(escape(input.as_str()?).to_string())
}

#[js_function(1)]
fn escape_html_buf(ctx: CallContext) -> Result<JsString> {
  let input = ctx.get::<JsBuffer>(0)?;
  let input_buf: &[u8] = &input;
  ctx
    .env
    .create_string_from_std(escape(unsafe { str::from_utf8_unchecked(input_buf) }).to_string())
}

#[js_function(1)]
fn async_escape_html_buf(ctx: CallContext) -> Result<JsObject> {
  let input = ctx.get::<JsBuffer>(0)?;
  let task = EscapeTask(input.data);

  ctx.env.spawn(task)
}
