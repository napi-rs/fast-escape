use std::str;

use napi::{
  bindgen_prelude::{AbortSignal, AsyncTask, Buffer},
  Env, JsBuffer, JsBufferValue, Ref, Result, Task,
};
use napi_derive::napi;
use v_htmlescape::escape;

#[cfg(all(
  target_arch = "x86_64",
  not(target_env = "musl"),
  not(debug_assertions)
))]
#[global_allocator]
static ALLOC: mimalloc::MiMalloc = mimalloc::MiMalloc;

#[repr(transparent)]
pub struct EscapeTask(Ref<JsBufferValue>);

#[napi]
impl Task for EscapeTask {
  type Output = String;
  type JsValue = String;

  fn compute(&mut self) -> Result<Self::Output> {
    Ok(escape(unsafe { str::from_utf8_unchecked(&self.0) }).to_string())
  }

  fn resolve(&mut self, _env: Env, output: Self::Output) -> Result<Self::JsValue> {
    Ok(output)
  }

  fn finally(&mut self, env: Env) -> Result<()> {
    self.0.unref(env)?;
    Ok(())
  }
}

#[napi(js_name = "escapeHTML")]
pub fn escape_html(input: String) -> String {
  escape(input.as_str()).to_string()
}

#[napi(js_name = "escapeHTMLBuf")]
pub fn escape_html_buf(input: Buffer) -> String {
  escape(unsafe { str::from_utf8_unchecked(input.as_ref()) }).to_string()
}

#[napi(js_name = "asyncEscapeHTMLBuf")]
pub fn async_escape_html_buf(
  input: JsBuffer,
  signal: Option<AbortSignal>,
) -> Result<AsyncTask<EscapeTask>> {
  let task = EscapeTask(input.into_ref()?);
  Ok(AsyncTask::with_optional_signal(task, signal))
}
