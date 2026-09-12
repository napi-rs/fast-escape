use std::str;

use napi::{
  bindgen_prelude::{AbortSignal, AsyncTask, Uint8Array},
  Env, Error, Result, Task,
};
use napi_derive::napi;
use html_escape_simd::escape_html as simd_escape_html;

fn escape(input: &str) -> Result<String> {
  simd_escape_html(input).map_err(|e| Error::from_reason(e.to_string()))
}

#[cfg(not(target_family = "wasm"))]
#[global_allocator]
static ALLOC: mimalloc_safe::MiMalloc = mimalloc_safe::MiMalloc;

#[repr(transparent)]
pub struct EscapeTask(Uint8Array);

#[napi]
impl Task for EscapeTask {
  type Output = String;
  type JsValue = String;

  fn compute(&mut self) -> Result<Self::Output> {
    escape(unsafe { str::from_utf8_unchecked(&self.0) })
  }

  fn resolve(&mut self, _env: Env, output: Self::Output) -> Result<Self::JsValue> {
    Ok(output)
  }
}

#[napi(js_name = "escapeHTML")]
pub fn escape_html(input: String) -> Result<String> {
  escape(input.as_str())
}

#[napi(js_name = "escapeHTMLBuf")]
pub fn escape_html_buf(input: &[u8]) -> Result<String> {
  escape(unsafe { str::from_utf8_unchecked(input) })
}

#[napi(js_name = "asyncEscapeHTMLBuf")]
pub fn async_escape_html_buf(
  input: Uint8Array,
  signal: Option<AbortSignal>,
) -> AsyncTask<EscapeTask> {
  AsyncTask::with_optional_signal(EscapeTask(input), signal)
}
