use std::str;

use napi::{
  bindgen_prelude::{AbortSignal, AsyncTask, Uint8Array},
  Env, Result, Task,
};
use napi_derive::napi;
use v_htmlescape::escape;

#[cfg(not(target_family = "wasm"))]
#[global_allocator]
static ALLOC: mimalloc::MiMalloc = mimalloc::MiMalloc;

#[repr(transparent)]
pub struct EscapeTask(Uint8Array);

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
}

#[napi(js_name = "escapeHTML")]
pub fn escape_html(input: String) -> String {
  escape(input.as_str()).to_string()
}

#[napi(js_name = "escapeHTMLBuf")]
pub fn escape_html_buf(input: &[u8]) -> String {
  escape(unsafe { str::from_utf8_unchecked(input) }).to_string()
}

#[napi(js_name = "asyncEscapeHTMLBuf")]
pub fn async_escape_html_buf(
  input: Uint8Array,
  signal: Option<AbortSignal>,
) -> AsyncTask<EscapeTask> {
  AsyncTask::with_optional_signal(EscapeTask(input), signal)
}
