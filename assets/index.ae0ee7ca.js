var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var require_index_ae0ee7ca = __commonJS({
  "assets/index.ae0ee7ca.js"(exports, module) {
    (function polyfill() {
      const relList = document.createElement("link").relList;
      if (relList && relList.supports && relList.supports("modulepreload")) {
        return;
      }
      for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
        processPreload(link);
      }
      new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (mutation.type !== "childList") {
            continue;
          }
          for (const node of mutation.addedNodes) {
            if (node.tagName === "LINK" && node.rel === "modulepreload")
              processPreload(node);
          }
        }
      }).observe(document, { childList: true, subtree: true });
      function getFetchOpts(script) {
        const fetchOpts = {};
        if (script.integrity)
          fetchOpts.integrity = script.integrity;
        if (script.referrerpolicy)
          fetchOpts.referrerPolicy = script.referrerpolicy;
        if (script.crossorigin === "use-credentials")
          fetchOpts.credentials = "include";
        else if (script.crossorigin === "anonymous")
          fetchOpts.credentials = "omit";
        else
          fetchOpts.credentials = "same-origin";
        return fetchOpts;
      }
      function processPreload(link) {
        if (link.ep)
          return;
        link.ep = true;
        const fetchOpts = getFetchOpts(link);
        fetch(link.href, fetchOpts);
      }
    })();
    function resize_canvas(width, height) {
      console.log(width, height);
      const canvas = document.querySelector("canvas");
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
    }
    window.resize_canvas = resize_canvas;
    ((win) => {
      if (/mobile/i.test(navigator.userAgent)) {
        document.body.classList.add("is-mobile");
      }
      let _isPortrait, _documentVisibilityState;
      function updateInfos() {
        _isPortrait = /mobile/i.test(navigator.userAgent) ? window.innerHeight > window.innerWidth : true;
        _documentVisibilityState = document.visibilityState;
      }
      updateInfos();
      let _isPortraitTimer = setInterval(updateInfos, 100);
      win.is_stopped = function() {
        return !_isPortrait || _documentVisibilityState === "hidden";
      };
      win.debug_is_stopped = function(isStopped) {
        clearInterval(_isPortraitTimer);
        _isPortrait = Boolean(isStopped);
      };
    })(window);
    const _orientation = {
      x: 0,
      y: 0
    };
    window.get_orientation_x = function() {
      return _orientation.x;
    };
    window.get_orientation_y = function() {
      return _orientation.y;
    };
    function onDeviceOrientation(event) {
      _orientation.x = event.gamma / 20;
      _orientation.y = -event.beta / 20;
    }
    const requestAccessAsync = async () => {
      if (typeof DeviceOrientationEvent === "undefined") {
        console.log("Device orientation event is not supported by your browser");
        return false;
      }
      if (DeviceOrientationEvent.requestPermission && typeof DeviceMotionEvent.requestPermission === "function") {
        let permission;
        try {
          permission = await DeviceOrientationEvent.requestPermission();
        } catch (err) {
          console.error(err);
          return false;
        }
        if (permission !== "granted") {
          console.error("Request to access the device orientation was rejected", { permission });
          return false;
        }
      }
      window.addEventListener("deviceorientation", onDeviceOrientation);
      return true;
    };
    window.addEventListener("click", () => {
      requestAccessAsync();
    }, { once: true });
    console.log("window", window, "document.body", document.body);
    const style = "";
    const network = "";
    const lAudioContext = typeof AudioContext !== "undefined" ? AudioContext : typeof webkitAudioContext !== "undefined" ? webkitAudioContext : void 0;
    let wasm;
    const heap = new Array(128).fill(void 0);
    heap.push(void 0, null, true, false);
    function getObject(idx) {
      return heap[idx];
    }
    let heap_next = heap.length;
    function dropObject(idx) {
      if (idx < 132)
        return;
      heap[idx] = heap_next;
      heap_next = idx;
    }
    function takeObject(idx) {
      const ret2 = getObject(idx);
      dropObject(idx);
      return ret2;
    }
    function addHeapObject(obj) {
      if (heap_next === heap.length)
        heap.push(heap.length + 1);
      const idx = heap_next;
      heap_next = heap[idx];
      heap[idx] = obj;
      return idx;
    }
    let WASM_VECTOR_LEN = 0;
    let cachedUint8ArrayMemory0 = null;
    function getUint8ArrayMemory0() {
      if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
      }
      return cachedUint8ArrayMemory0;
    }
    const cachedTextEncoder = typeof TextEncoder !== "undefined" ? new TextEncoder("utf-8") : { encode: () => {
      throw Error("TextEncoder not available");
    } };
    const encodeString = typeof cachedTextEncoder.encodeInto === "function" ? function(arg, view) {
      return cachedTextEncoder.encodeInto(arg, view);
    } : function(arg, view) {
      const buf = cachedTextEncoder.encode(arg);
      view.set(buf);
      return {
        read: arg.length,
        written: buf.length
      };
    };
    function passStringToWasm0(arg, malloc, realloc) {
      if (realloc === void 0) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr2 = malloc(buf.length, 1) >>> 0;
        getUint8ArrayMemory0().subarray(ptr2, ptr2 + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr2;
      }
      let len = arg.length;
      let ptr = malloc(len, 1) >>> 0;
      const mem = getUint8ArrayMemory0();
      let offset = 0;
      for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 127)
          break;
        mem[ptr + offset] = code;
      }
      if (offset !== len) {
        if (offset !== 0) {
          arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret2 = encodeString(arg, view);
        offset += ret2.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
      }
      WASM_VECTOR_LEN = offset;
      return ptr;
    }
    function isLikeNone(x) {
      return x === void 0 || x === null;
    }
    let cachedDataViewMemory0 = null;
    function getDataViewMemory0() {
      if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || cachedDataViewMemory0.buffer.detached === void 0 && cachedDataViewMemory0.buffer !== wasm.memory.buffer) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
      }
      return cachedDataViewMemory0;
    }
    const cachedTextDecoder = typeof TextDecoder !== "undefined" ? new TextDecoder("utf-8", { ignoreBOM: true, fatal: true }) : { decode: () => {
      throw Error("TextDecoder not available");
    } };
    if (typeof TextDecoder !== "undefined") {
      cachedTextDecoder.decode();
    }
    function getStringFromWasm0(ptr, len) {
      ptr = ptr >>> 0;
      return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
    }
    function debugString(val) {
      const type = typeof val;
      if (type == "number" || type == "boolean" || val == null) {
        return `${val}`;
      }
      if (type == "string") {
        return `"${val}"`;
      }
      if (type == "symbol") {
        const description = val.description;
        if (description == null) {
          return "Symbol";
        } else {
          return `Symbol(${description})`;
        }
      }
      if (type == "function") {
        const name = val.name;
        if (typeof name == "string" && name.length > 0) {
          return `Function(${name})`;
        } else {
          return "Function";
        }
      }
      if (Array.isArray(val)) {
        const length = val.length;
        let debug = "[";
        if (length > 0) {
          debug += debugString(val[0]);
        }
        for (let i = 1; i < length; i++) {
          debug += ", " + debugString(val[i]);
        }
        debug += "]";
        return debug;
      }
      const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
      let className;
      if (builtInMatches.length > 1) {
        className = builtInMatches[1];
      } else {
        return toString.call(val);
      }
      if (className == "Object") {
        try {
          return "Object(" + JSON.stringify(val) + ")";
        } catch (_) {
          return "Object";
        }
      }
      if (val instanceof Error) {
        return `${val.name}: ${val.message}
${val.stack}`;
      }
      return className;
    }
    const CLOSURE_DTORS = typeof FinalizationRegistry === "undefined" ? { register: () => {
    }, unregister: () => {
    } } : new FinalizationRegistry((state) => {
      wasm.__wbindgen_export_2.get(state.dtor)(state.a, state.b);
    });
    function makeMutClosure(arg02, arg12, dtor, f) {
      const state = { a: arg02, b: arg12, cnt: 1, dtor };
      const real = (...args) => {
        state.cnt++;
        const a = state.a;
        state.a = 0;
        try {
          return f(a, state.b, ...args);
        } finally {
          if (--state.cnt === 0) {
            wasm.__wbindgen_export_2.get(state.dtor)(a, state.b);
            CLOSURE_DTORS.unregister(state);
          } else {
            state.a = a;
          }
        }
      };
      real.original = state;
      CLOSURE_DTORS.register(real, state, state);
      return real;
    }
    function __wbg_adapter_34(arg02, arg12, arg2) {
      wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h29d934d10d08b636(arg02, arg12, addHeapObject(arg2));
    }
    function __wbg_adapter_37(arg02, arg12) {
      wasm._dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h8ec4d51fdf66743b(arg02, arg12);
    }
    function __wbg_adapter_40(arg02, arg12, arg2) {
      wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h165b2f1da9ecae19(arg02, arg12, addHeapObject(arg2));
    }
    function __wbg_adapter_43(arg02, arg12, arg2) {
      wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h09d52310bf0add20(arg02, arg12, addHeapObject(arg2));
    }
    function __wbg_adapter_46(arg02, arg12) {
      wasm._dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h826686f0285f7052(arg02, arg12);
    }
    function __wbg_adapter_51(arg02, arg12, arg2, arg3) {
      wasm._dyn_core__ops__function__FnMut__A_B___Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hd0cd8d76d41b0637(arg02, arg12, addHeapObject(arg2), addHeapObject(arg3));
    }
    function handleError(f, args) {
      try {
        return f.apply(this, args);
      } catch (e) {
        wasm.__wbindgen_exn_store(addHeapObject(e));
      }
    }
    let cachedInt32ArrayMemory0 = null;
    function getInt32ArrayMemory0() {
      if (cachedInt32ArrayMemory0 === null || cachedInt32ArrayMemory0.byteLength === 0) {
        cachedInt32ArrayMemory0 = new Int32Array(wasm.memory.buffer);
      }
      return cachedInt32ArrayMemory0;
    }
    function getArrayI32FromWasm0(ptr, len) {
      ptr = ptr >>> 0;
      return getInt32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
    }
    let cachedUint32ArrayMemory0 = null;
    function getUint32ArrayMemory0() {
      if (cachedUint32ArrayMemory0 === null || cachedUint32ArrayMemory0.byteLength === 0) {
        cachedUint32ArrayMemory0 = new Uint32Array(wasm.memory.buffer);
      }
      return cachedUint32ArrayMemory0;
    }
    function getArrayU32FromWasm0(ptr, len) {
      ptr = ptr >>> 0;
      return getUint32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
    }
    let cachedFloat32ArrayMemory0 = null;
    function getFloat32ArrayMemory0() {
      if (cachedFloat32ArrayMemory0 === null || cachedFloat32ArrayMemory0.byteLength === 0) {
        cachedFloat32ArrayMemory0 = new Float32Array(wasm.memory.buffer);
      }
      return cachedFloat32ArrayMemory0;
    }
    function getArrayF32FromWasm0(ptr, len) {
      ptr = ptr >>> 0;
      return getFloat32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
    }
    const __wbindgen_enum_GamepadMappingType = ["", "standard"];
    const __wbindgen_enum_ResizeObserverBoxOptions = ["border-box", "content-box", "device-pixel-content-box"];
    const __wbindgen_enum_VisibilityState = ["hidden", "visible"];
    async function __wbg_load(module2, imports2) {
      if (typeof Response === "function" && module2 instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === "function") {
          try {
            return await WebAssembly.instantiateStreaming(module2, imports2);
          } catch (e) {
            if (module2.headers.get("Content-Type") != "application/wasm") {
              console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);
            } else {
              throw e;
            }
          }
        }
        const bytes = await module2.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports2);
      } else {
        const instance = await WebAssembly.instantiate(module2, imports2);
        if (instance instanceof WebAssembly.Instance) {
          return { instance, module: module2 };
        } else {
          return instance;
        }
      }
    }
    function __wbg_get_imports() {
      const imports = {};
      imports.wbg = {};
      imports.wbg.__wbindgen_object_drop_ref = function(arg02) {
        takeObject(arg02);
      };
      imports.wbg.__wbg_stringify_eead5648c09faaf8 = function() {
        return handleError(function(arg02) {
          const ret2 = JSON.stringify(getObject(arg02));
          return addHeapObject(ret2);
        }, arguments);
      };
      imports.wbg.__wbg_Window_f4441e69cbceafcc = function(arg02) {
        const ret2 = getObject(arg02).Window;
        return addHeapObject(ret2);
      };
      imports.wbg.__wbindgen_is_undefined = function(arg02) {
        const ret2 = getObject(arg02) === void 0;
        return ret2;
      };
      imports.wbg.__wbg_fetch_bfd3aa46955593c3 = function(arg02, arg12, arg2) {
        const ret2 = getObject(arg02).fetch(getStringFromWasm0(arg12, arg2));
        return addHeapObject(ret2);
      };
      imports.wbg.__wbg_WorkerGlobalScope_2500166acca3df02 = function(arg02) {
        const ret2 = getObject(arg02).WorkerGlobalScope;
        return addHeapObject(ret2);
      };
      imports.wbg.__wbg_fetch_896e530c3d511c11 = function(arg02, arg12, arg2) {
        const ret2 = getObject(arg02).fetch(getStringFromWasm0(arg12, arg2));
        return addHeapObject(ret2);
      };
      imports.wbg.__wbg_instanceof_Response_3c0e210a57ff751d = function(arg02) {
        let result;
        try {
          result = getObject(arg02) instanceof Response;
        } catch (_) {
          result = false;
        }
        const ret2 = result;
        return ret2;
      };
      imports.wbg.__wbg_status_5f4e900d22140a18 = function(arg02) {
        const ret2 = getObject(arg02).status;
        return ret2;
      };
      imports.wbg.__wbg_arrayBuffer_144729e09879650e = function() {
        return handleError(function(arg02) {
          const ret2 = getObject(arg02).arrayBuffer();
          return addHeapObject(ret2);
        }, arguments);
      };
      imports.wbg.__wbg_new_fec2611eb9180f95 = function(arg02) {
        const ret2 = new Uint8Array(getObject(arg02));
        return addHeapObject(ret2);
      };
      imports.wbg.__wbg_navigator_3d3836196a5d8e62 = function(arg02) {
        const ret2 = getObject(arg02).navigator;
        return addHeapObject(ret2);
      };
      imports.wbg.__wbg_userAgent_b433f0f22dfedec5 = function() {
        return handleError(function(arg02, arg12) {
          const ret2 = getObject(arg12).userAgent;
          const ptr1 = passStringToWasm0(ret2, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
          const len1 = WASM_VECTOR_LEN;
          getDataViewMemory0().setInt32(arg02 + 4 * 1, len1, true);
          getDataViewMemory0().setInt32(arg02 + 4 * 0, ptr1, true);
        }, arguments);
      };
      imports.wbg.__wbg_document_d7fa2c739c2b191a = function(arg02) {
        const ret2 = getObject(arg02).document;
        return isLikeNone(ret2) ? 0 : addHeapObject(ret2);
      };
      imports.wbg.__wbg_addEventListener_4357f9b7b3826784 = function() {
        return handleError(function(arg02, arg12, arg2, arg3) {
          getObject(arg02).addEventListener(getStringFromWasm0(arg12, arg2), getObject(arg3));
        }, arguments);
      };
      imports.wbg.__wbindgen_object_clone_ref = function(arg02) {
        const ret2 = getObject(arg02);
        return addHeapObject(ret2);
      };
      imports.wbg.__wbg_clipboard_e43b3472696043c3 = function(arg02) {
        const ret2 = getObject(arg02).clipboard;
        return addHeapObject(ret2);
      };
      imports.wbg.__wbg_writeText_9d976569ea57aa0d = function(arg02, arg12, arg2) {
        const ret2 = getObject(arg02).writeText(getStringFromWasm0(arg12, arg2));
        return addHeapObject(ret2);
      };
      imports.wbg.__wbindgen_string_get = function(arg02, arg12) {
        const obj = getObject(arg12);
        const ret2 = typeof obj === "string" ? obj : void 0;
        var ptr1 = isLikeNone(ret2) ? 0 : passStringToWasm0(ret2, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg02 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg02 + 4 * 0, ptr1, true);
      };
      imports.wbg.__wbindgen_cb_drop = function(arg02) {
        const obj = takeObject(arg02).original;
        if (obj.cnt-- == 1) {
          obj.a = 0;
          return true;
        }
        const ret2 = false;
        return ret2;
      };
      imports.wbg.__wbg_clipboardData_6c07151d2898ce82 = function(arg02) {
        const ret2 = getObject(arg02).clipboardData;
        return isLikeNone(ret2) ? 0 : addHeapObject(ret2);
      };
      imports.wbg.__wbg_getData_d687ebb5e1da9d6e = function() {
        return handleError(function(arg02, arg12, arg2, arg3) {
          const ret2 = getObject(arg12).getData(getStringFromWasm0(arg2, arg3));
          const ptr1 = passStringToWasm0(ret2, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
          const len1 = WASM_VECTOR_LEN;
          getDataViewMemory0().setInt32(arg02 + 4 * 1, len1, true);
          getDataViewMemory0().setInt32(arg02 + 4 * 0, ptr1, true);
        }, arguments);
      };
      imports.wbg.__wbg_style_04eb1488bc2ceffc = function(arg02) {
        const ret2 = getObject(arg02).style;
        return addHeapObject(ret2);
      };
      imports.wbg.__wbg_setProperty_b9a2384cbfb499fb = function() {
        return handleError(function(arg02, arg12, arg2, arg3, arg4) {
          getObject(arg02).setProperty(getStringFromWasm0(arg12, arg2), getStringFromWasm0(arg3, arg4));
        }, arguments);
      };
      imports.wbg.__wbg_devicePixelRatio_5d0556383aa83231 = function(arg02) {
        const ret2 = getObject(arg02).devicePixelRatio;
        return ret2;
      };
      imports.wbg.__wbg_mark_40e050a77cc39fea = function(arg02, arg12) {
        performance.mark(getStringFromWasm0(arg02, arg12));
      };
      imports.wbg.__wbg_querySelector_e4353fe90bee0601 = function() {
        return handleError(function(arg02, arg12, arg2) {
          const ret2 = getObject(arg02).querySelector(getStringFromWasm0(arg12, arg2));
          return isLikeNone(ret2) ? 0 : addHeapObject(ret2);
        }, arguments);
      };
      imports.wbg.__wbg_instanceof_HtmlCanvasElement_022ad88c76df9031 = function(arg02) {
        let result;
        try {
          result = getObject(arg02) instanceof HTMLCanvasElement;
        } catch (_) {
          result = false;
        }
        const ret2 = result;
        return ret2;
      };
      imports.wbg.__wbg_focus_6b6181f7644f6dbc = function() {
        return handleError(function(arg02) {
          getObject(arg02).focus();
        }, arguments);
      };
      imports.wbg.__wbg_exitPointerLock_42de2c91cfcc3203 = function(arg02) {
        getObject(arg02).exitPointerLock();
      };
      imports.wbg.__wbg_requestPointerLock_322607e3bc628f7a = function(arg02) {
        getObject(arg02).requestPointerLock();
      };
      imports.wbg.__wbg_new_abda76e883ba8a5f = function() {
        const ret2 = new Error();
        return addHeapObject(ret2);
      };
      imports.wbg.__wbg_stack_658279fe44541cf6 = function(arg02, arg12) {
        const ret2 = getObject(arg12).stack;
        const ptr1 = passStringToWasm0(ret2, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg02 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg02 + 4 * 0, ptr1, true);
      };
      imports.wbg.__wbg_error_f851667af71bcfc6 = function(arg02, arg12) {
        let deferred0_0;
        let deferred0_1;
        try {
          deferred0_0 = arg02;
          deferred0_1 = arg12;
          console.error(getStringFromWasm0(arg02, arg12));
        } finally {
          wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
        }
      };
      imports.wbg.__wbg_resume_9c4295ca96d8c40a = function() {
        return handleError(function(arg02) {
          const ret2 = getObject(arg02).resume();
          return addHeapObject(ret2);
        }, arguments);
      };
      imports.wbg.__wbg_setTimeout_e5d5b865335ce177 = function() {
        return handleError(function(arg02, arg12, arg2) {
          const ret2 = getObject(arg02).setTimeout(getObject(arg12), arg2);
          return ret2;
        }, arguments);
      };
      imports.wbg.__wbg_close_a65253886601b1ee = function() {
        return handleError(function(arg02) {
          const ret2 = getObject(arg02).close();
          return addHeapObject(ret2);
        }, arguments);
      };
      imports.wbg.__wbg_eval_1bab7c4fbae3b3d6 = function() {
        return handleError(function(arg0, arg1) {
          const ret = eval(getStringFromWasm0(arg0, arg1));
          return addHeapObject(ret);
        }, arguments);
      };
      imports.wbg.__wbindgen_boolean_get = function(arg02) {
        const v = getObject(arg02);
        const ret2 = typeof v === "boolean" ? v ? 1 : 0 : 2;
        return ret2;
      };
      imports.wbg.__wbg_crypto_1d1f22824a6a080c = function(arg02) {
        const ret2 = getObject(arg02).crypto;
        return addHeapObject(ret2);
      };
      imports.wbg.__wbindgen_is_object = function(arg02) {
        const val = getObject(arg02);
        const ret2 = typeof val === "object" && val !== null;
        return ret2;
      };
      imports.wbg.__wbg_process_4a72847cc503995b = function(arg02) {
        const ret2 = getObject(arg02).process;
        return addHeapObject(ret2);
      };
      imports.wbg.__wbg_versions_f686565e586dd935 = function(arg02) {
        const ret2 = getObject(arg02).versions;
        return addHeapObject(ret2);
      };
      imports.wbg.__wbg_node_104a2ff8d6ea03a2 = function(arg02) {
        const ret2 = getObject(arg02).node;
        return addHeapObject(ret2);
      };
      imports.wbg.__wbindgen_is_string = function(arg02) {
        const ret2 = typeof getObject(arg02) === "string";
        return ret2;
      };
      imports.wbg.__wbg_require_cca90b1a94a0255b = function() {
        return handleError(function() {
          const ret2 = module.require;
          return addHeapObject(ret2);
        }, arguments);
      };
      imports.wbg.__wbindgen_is_function = function(arg02) {
        const ret2 = typeof getObject(arg02) === "function";
        return ret2;
      };
      imports.wbg.__wbindgen_string_new = function(arg02, arg12) {
        const ret2 = getStringFromWasm0(arg02, arg12);
        return addHeapObject(ret2);
      };
      imports.wbg.__wbg_msCrypto_eb05e62b530a1508 = function(arg02) {
        const ret2 = getObject(arg02).msCrypto;
        return addHeapObject(ret2);
      };
      imports.wbg.__wbg_newwithlength_76462a666eca145f = function(arg02) {
        const ret2 = new Uint8Array(arg02 >>> 0);
        return addHeapObject(ret2);
      };
      imports.wbg.__wbg_randomFillSync_5c9c955aa56b6049 = function() {
        return handleError(function(arg02, arg12) {
          getObject(arg02).randomFillSync(takeObject(arg12));
        }, arguments);
      };
      imports.wbg.__wbg_subarray_975a06f9dbd16995 = function(arg02, arg12, arg2) {
        const ret2 = getObject(arg02).subarray(arg12 >>> 0, arg2 >>> 0);
        return addHeapObject(ret2);
      };
      imports.wbg.__wbg_getRandomValues_3aa56aa6edec874c = function() {
        return handleError(function(arg02, arg12) {
          getObject(arg02).getRandomValues(getObject(arg12));
        }, arguments);
      };
      imports.wbg.__wbg_now_70af4fe37a792251 = function() {
        const ret2 = Date.now();
        return ret2;
      };
      imports.wbg.__wbg_connected_db62337c768c2467 = function(arg02) {
        const ret2 = getObject(arg02).connected;
        return ret2;
      };
      imports.wbg.__wbindgen_number_get = function(arg02, arg12) {
        const obj = getObject(arg12);
        const ret2 = typeof obj === "number" ? obj : void 0;
        getDataViewMemory0().setFloat64(arg02 + 8 * 1, isLikeNone(ret2) ? 0 : ret2, true);
        getDataViewMemory0().setInt32(arg02 + 4 * 0, !isLikeNone(ret2), true);
      };
      imports.wbg.__wbg_pressed_90d9818eedea0eef = function(arg02) {
        const ret2 = getObject(arg02).pressed;
        return ret2;
      };
      imports.wbg.__wbg_value_9792b33c816e47af = function(arg02) {
        const ret2 = getObject(arg02).value;
        return ret2;
      };
      imports.wbg.__wbg_isSecureContext_8a5cdec3d92171bf = function(arg02) {
        const ret2 = getObject(arg02).isSecureContext;
        return ret2;
      };
      imports.wbg.__wbg_getGamepads_e54b0e9135685af3 = function() {
        return handleError(function(arg02) {
          const ret2 = getObject(arg02).getGamepads();
          return addHeapObject(ret2);
        }, arguments);
      };
      imports.wbg.__wbg_length_f217bbbf7e8e4df4 = function(arg02) {
        const ret2 = getObject(arg02).length;
        return ret2;
      };
      imports.wbg.__wbg_get_5419cf6b954aa11d = function(arg02, arg12) {
        const ret2 = getObject(arg02)[arg12 >>> 0];
        return addHeapObject(ret2);
      };
      imports.wbg.__wbindgen_is_null = function(arg02) {
        const ret2 = getObject(arg02) === null;
        return ret2;
      };
      imports.wbg.__wbg_instanceof_DomException_9c87cb6f93f43379 = function(arg02) {
        let result;
        try {
          result = getObject(arg02) instanceof DOMException;
        } catch (_) {
          result = false;
        }
        const ret2 = result;
        return ret2;
      };
      imports.wbg.__wbg_message_c7a4c5995cc33e84 = function(arg02, arg12) {
        const ret2 = getObject(arg12).message;
        const ptr1 = passStringToWasm0(ret2, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg02 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg02 + 4 * 0, ptr1, true);
      };
      imports.wbg.__wbg_index_8cbd5ff3bd795787 = function(arg02) {
        const ret2 = getObject(arg02).index;
        return ret2;
      };
      imports.wbg.__wbg_buttons_eb461fd639ddcc20 = function(arg02) {
        const ret2 = getObject(arg02).buttons;
        return addHeapObject(ret2);
      };
      imports.wbg.__wbg_axes_2a36e14aa82eefc9 = function(arg02) {
        const ret2 = getObject(arg02).axes;
        return addHeapObject(ret2);
      };
      imports.wbg.__wbg_id_8c477b5e4084ecfb = function(arg02, arg12) {
        const ret2 = getObject(arg12).id;
        const ptr1 = passStringToWasm0(ret2, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg02 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg02 + 4 * 0, ptr1, true);
      };
      imports.wbg.__wbg_new_800498ec872f75d4 = function(arg02, arg12, arg2, arg3) {
        const ret2 = new RegExp(getStringFromWasm0(arg02, arg12), getStringFromWasm0(arg2, arg3));
        return addHeapObject(ret2);
      };
      imports.wbg.__wbg_exec_c872ad5c15e456ad = function(arg02, arg12, arg2) {
        const ret2 = getObject(arg02).exec(getStringFromWasm0(arg12, arg2));
        return isLikeNone(ret2) ? 0 : addHeapObject(ret2);
      };
      imports.wbg.__wbg_mapping_bbf7356861bbea3a = function(arg02) {
        const ret2 = getObject(arg02).mapping;
        return (__wbindgen_enum_GamepadMappingType.indexOf(ret2) + 1 || 3) - 1;
      };
      imports.wbg.__wbg_getExtension_811520f1db50ca11 = function() {
        return handleError(function(arg02, arg12, arg2) {
          const ret2 = getObject(arg02).getExtension(getStringFromWasm0(arg12, arg2));
          return isLikeNone(ret2) ? 0 : addHeapObject(ret2);
        }, arguments);
      };
      imports.wbg.__wbg_getSupportedExtensions_ae0473d2b21281af = function(arg02) {
        const ret2 = getObject(arg02).getSupportedExtensions();
        return isLikeNone(ret2) ? 0 : addHeapObject(ret2);
      };
      imports.wbg.__wbg_getParameter_1b7c85c782ee0a5e = function() {
        return handleError(function(arg02, arg12) {
          const ret2 = getObject(arg02).getParameter(arg12 >>> 0);
          return addHeapObject(ret2);
        }, arguments);
      };
      imports.wbg.__wbg_texSubImage2D_e5ec0c323060b567 = function() {
        return handleError(function(arg02, arg12, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
          getObject(arg02).texSubImage2D(arg12 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, getObject(arg9));
        }, arguments);
      };
      imports.wbg.__wbg_texSubImage2D_a70ed16617b934eb = function() {
        return handleError(function(arg02, arg12, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
          getObject(arg02).texSubImage2D(arg12 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, getObject(arg9));
        }, arguments);
      };
      imports.wbg.__wbg_texSubImage2D_fcc3db78c8c4dfd4 = function() {
        return handleError(function(arg02, arg12, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
          getObject(arg02).texSubImage2D(arg12 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, getObject(arg9));
        }, arguments);
      };
      imports.wbg.__wbg_texSubImage3D_dbf08e66ae19c720 = function() {
        return handleError(function(arg02, arg12, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
          getObject(arg02).texSubImage3D(arg12 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0, getObject(arg11));
        }, arguments);
      };
      imports.wbg.__wbg_texSubImage3D_fa9088aa90bc643e = function() {
        return handleError(function(arg02, arg12, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
          getObject(arg02).texSubImage3D(arg12 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0, getObject(arg11));
        }, arguments);
      };
      imports.wbg.__wbg_texSubImage3D_872ac7e01fe6afdb = function() {
        return handleError(function(arg02, arg12, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
          getObject(arg02).texSubImage3D(arg12 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0, getObject(arg11));
        }, arguments);
      };
      imports.wbg.__wbg_framebufferTextureMultiviewOVR_7662ba7db516244e = function(arg02, arg12, arg2, arg3, arg4, arg5, arg6) {
        getObject(arg02).framebufferTextureMultiviewOVR(arg12 >>> 0, arg2 >>> 0, getObject(arg3), arg4, arg5, arg6);
      };
      imports.wbg.__wbg_bindFramebuffer_b9be4c8bf236f0e8 = function(arg02, arg12, arg2) {
        getObject(arg02).bindFramebuffer(arg12 >>> 0, getObject(arg2));
      };
      imports.wbg.__wbg_bindFramebuffer_21286675ec02dcb0 = function(arg02, arg12, arg2) {
        getObject(arg02).bindFramebuffer(arg12 >>> 0, getObject(arg2));
      };
      imports.wbg.__wbg_getSupportedProfiles_4e71d1eaf77f6211 = function(arg02) {
        const ret2 = getObject(arg02).getSupportedProfiles();
        return isLikeNone(ret2) ? 0 : addHeapObject(ret2);
      };
      imports.wbg.__wbg_new_034f913e7636e987 = function() {
        const ret2 = new Array();
        return addHeapObject(ret2);
      };
      imports.wbg.__wbg_includes_2d453f0c8f71a0e8 = function(arg02, arg12, arg2) {
        const ret2 = getObject(arg02).includes(getObject(arg12), arg2);
        return ret2;
      };
      imports.wbg.__wbg_createFramebuffer_982db8b568b3eca9 = function(arg02) {
        const ret2 = getObject(arg02).createFramebuffer();
        return isLikeNone(ret2) ? 0 : addHeapObject(ret2);
      };
      imports.wbg.__wbg_createFramebuffer_ad461f789f313e65 = function(arg02) {
        const ret2 = getObject(arg02).createFramebuffer();
        return isLikeNone(ret2) ? 0 : addHeapObject(ret2);
      };
      imports.wbg.__wbg_createQuery_0795eefd252e80f8 = function(arg02) {
        const ret2 = getObject(arg02).createQuery();
        return isLikeNone(ret2) ? 0 : addHeapObject(ret2);
      };
      imports.wbg.__wbg_createRenderbuffer_99bf5d848bb24276 = function(arg02) {
        const ret2 = getObject(arg02).createRenderbuffer();
        return isLikeNone(ret2) ? 0 : addHeapObject(ret2);
      };
      imports.wbg.__wbg_createRenderbuffer_fd9d446bba29f340 = function(arg02) {
        const ret2 = getObject(arg02).createRenderbuffer();
        return isLikeNone(ret2) ? 0 : addHeapObject(ret2);
      };
      imports.wbg.__wbg_createSampler_04ad5e8ab76483fb = function(arg02) {
        const ret2 = getObject(arg02).createSampler();
        return isLikeNone(ret2) ? 0 : addHeapObject(ret2);
      };
      imports.wbg.__wbg_createShader_3edd95eb001d29c9 = function(arg02, arg12) {
        const ret2 = getObject(arg02).createShader(arg12 >>> 0);
        return isLikeNone(ret2) ? 0 : addHeapObject(ret2);
      };
      imports.wbg.__wbg_createShader_f956a5ec67a77964 = function(arg02, arg12) {
        const ret2 = getObject(arg02).createShader(arg12 >>> 0);
        return isLikeNone(ret2) ? 0 : addHeapObject(ret2);
      };
      imports.wbg.__wbg_createTexture_01a5bbc5d52164d2 = function(arg02) {
        const ret2 = getObject(arg02).createTexture();
        return isLikeNone(ret2) ? 0 : addHeapObject(ret2);
      };
      imports.wbg.__wbg_createTexture_3ebc81a77f42cd4b = function(arg02) {
        const ret2 = getObject(arg02).createTexture();
        return isLikeNone(ret2) ? 0 : addHeapObject(ret2);
      };
      imports.wbg.__wbg_deleteShader_a49077cc02f9d75c = function(arg02, arg12) {
        getObject(arg02).deleteShader(getObject(arg12));
      };
      imports.wbg.__wbg_deleteShader_c65ef8df50ff2e29 = function(arg02, arg12) {
        getObject(arg02).deleteShader(getObject(arg12));
      };
      imports.wbg.__wbg_shaderSource_f8f569556926b597 = function(arg02, arg12, arg2, arg3) {
        getObject(arg02).shaderSource(getObject(arg12), getStringFromWasm0(arg2, arg3));
      };
      imports.wbg.__wbg_shaderSource_c36f18b5114855e7 = function(arg02, arg12, arg2, arg3) {
        getObject(arg02).shaderSource(getObject(arg12), getStringFromWasm0(arg2, arg3));
      };
      imports.wbg.__wbg_compileShader_48a677cac607634b = function(arg02, arg12) {
        getObject(arg02).compileShader(getObject(arg12));
      };
      imports.wbg.__wbg_compileShader_9680f4f1d833586c = function(arg02, arg12) {
        getObject(arg02).compileShader(getObject(arg12));
      };
      imports.wbg.__wbg_getShaderParameter_e5207a499ce4b3a1 = function(arg02, arg12, arg2) {
        const ret2 = getObject(arg02).getShaderParameter(getObject(arg12), arg2 >>> 0);
        return addHeapObject(ret2);
      };
      imports.wbg.__wbg_getShaderParameter_e21fb00f8255b86b = function(arg02, arg12, arg2) {
        const ret2 = getObject(arg02).getShaderParameter(getObject(arg12), arg2 >>> 0);
        return addHeapObject(ret2);
      };
      imports.wbg.__wbg_getShaderInfoLog_eabc357ae8803006 = function(arg02, arg12, arg2) {
        const ret2 = getObject(arg12).getShaderInfoLog(getObject(arg2));
        var ptr1 = isLikeNone(ret2) ? 0 : passStringToWasm0(ret2, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg02 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg02 + 4 * 0, ptr1, true);
      };
      imports.wbg.__wbg_getShaderInfoLog_afb2baaac4baaff5 = function(arg02, arg12, arg2) {
        const ret2 = getObject(arg12).getShaderInfoLog(getObject(arg2));
        var ptr1 = isLikeNone(ret2) ? 0 : passStringToWasm0(ret2, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg02 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg02 + 4 * 0, ptr1, true);
      };
      imports.wbg.__wbg_createProgram_1510c4697aed8d2f = function(arg02) {
        const ret2 = getObject(arg02).createProgram();
        return isLikeNone(ret2) ? 0 : addHeapObject(ret2);
      };
      imports.wbg.__wbg_createProgram_48b8a105fd0cfb35 = function(arg02) {
        const ret2 = getObject(arg02).createProgram();
        return isLikeNone(ret2) ? 0 : addHeapObject(ret2);
      };
      imports.wbg.__wbg_deleteProgram_16d8257cfae7ddbe = function(arg02, arg12) {
        getObject(arg02).deleteProgram(getObject(arg12));
      };
      imports.wbg.__wbg_deleteProgram_ef8d37545b8ab3ce = function(arg02, arg12) {
        getObject(arg02).deleteProgram(getObject(arg12));
      };
      imports.wbg.__wbg_attachShader_4a6cb7b86d7531b8 = function(arg02, arg12, arg2) {
        getObject(arg02).attachShader(getObject(arg12), getObject(arg2));
      };
      imports.wbg.__wbg_attachShader_299671ccaa78592c = function(arg02, arg12, arg2) {
        getObject(arg02).attachShader(getObject(arg12), getObject(arg2));
      };
      imports.wbg.__wbg_linkProgram_b4246295077a3859 = function(arg02, arg12) {
        getObject(arg02).linkProgram(getObject(arg12));
      };
      imports.wbg.__wbg_linkProgram_983c5972b815b0de = function(arg02, arg12) {
        getObject(arg02).linkProgram(getObject(arg12));
      };
      imports.wbg.__wbg_getProgramParameter_2fc04fee21ea5036 = function(arg02, arg12, arg2) {
        const ret2 = getObject(arg02).getProgramParameter(getObject(arg12), arg2 >>> 0);
        return addHeapObject(ret2);
      };
      imports.wbg.__wbg_getProgramParameter_4c981ddc3b62dda8 = function(arg02, arg12, arg2) {
        const ret2 = getObject(arg02).getProgramParameter(getObject(arg12), arg2 >>> 0);
        return addHeapObject(ret2);
      };
      imports.wbg.__wbg_getProgramInfoLog_2ebf87ded3a93ef1 = function(arg02, arg12, arg2) {
        const ret2 = getObject(arg12).getProgramInfoLog(getObject(arg2));
        var ptr1 = isLikeNone(ret2) ? 0 : passStringToWasm0(ret2, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg02 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg02 + 4 * 0, ptr1, true);
      };
      imports.wbg.__wbg_getProgramInfoLog_16c69289b6a9c98e = function(arg02, arg12, arg2) {
        const ret2 = getObject(arg12).getProgramInfoLog(getObject(arg2));
        var ptr1 = isLikeNone(ret2) ? 0 : passStringToWasm0(ret2, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg02 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg02 + 4 * 0, ptr1, true);
      };
      imports.wbg.__wbg_useProgram_8232847dbf97643a = function(arg02, arg12) {
        getObject(arg02).useProgram(getObject(arg12));
      };
      imports.wbg.__wbg_useProgram_0f0a7b123a5eba79 = function(arg02, arg12) {
        getObject(arg02).useProgram(getObject(arg12));
      };
      imports.wbg.__wbg_createBuffer_2f1b069b0fbe4db7 = function(arg02) {
        const ret2 = getObject(arg02).createBuffer();
        return isLikeNone(ret2) ? 0 : addHeapObject(ret2);
      };
      imports.wbg.__wbg_createBuffer_478457cb9beff1a3 = function(arg02) {
        const ret2 = getObject(arg02).createBuffer();
        return isLikeNone(ret2) ? 0 : addHeapObject(ret2);
      };
      imports.wbg.__wbg_bindBuffer_70e5a7ef4920142a = function(arg02, arg12, arg2) {
        getObject(arg02).bindBuffer(arg12 >>> 0, getObject(arg2));
      };
      imports.wbg.__wbg_bindBuffer_87bece1307f4836f = function(arg02, arg12, arg2) {
        getObject(arg02).bindBuffer(arg12 >>> 0, getObject(arg2));
      };
      imports.wbg.__wbg_bindBufferRange_68e6d902beca2cf8 = function(arg02, arg12, arg2, arg3, arg4, arg5) {
        getObject(arg02).bindBufferRange(arg12 >>> 0, arg2 >>> 0, getObject(arg3), arg4, arg5);
      };
      imports.wbg.__wbg_bindRenderbuffer_b5a39364d07f8f0e = function(arg02, arg12, arg2) {
        getObject(arg02).bindRenderbuffer(arg12 >>> 0, getObject(arg2));
      };
      imports.wbg.__wbg_bindRenderbuffer_c0813f918b791132 = function(arg02, arg12, arg2) {
        getObject(arg02).bindRenderbuffer(arg12 >>> 0, getObject(arg2));
      };
      imports.wbg.__wbg_blitFramebuffer_bd01a21856ea0fbc = function(arg02, arg12, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
        getObject(arg02).blitFramebuffer(arg12, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0);
      };
      imports.wbg.__wbg_createVertexArrayOES_6e8273e64e878af6 = function(arg02) {
        const ret2 = getObject(arg02).createVertexArrayOES();
        return isLikeNone(ret2) ? 0 : addHeapObject(ret2);
      };
      imports.wbg.__wbg_createVertexArray_ec08b54b9f8c74ea = function(arg02) {
        const ret2 = getObject(arg02).createVertexArray();
        return isLikeNone(ret2) ? 0 : addHeapObject(ret2);
      };
      imports.wbg.__wbg_deleteVertexArray_112dd9bcd72ec608 = function(arg02, arg12) {
        getObject(arg02).deleteVertexArray(getObject(arg12));
      };
      imports.wbg.__wbg_deleteVertexArrayOES_f24bf9fab17be367 = function(arg02, arg12) {
        getObject(arg02).deleteVertexArrayOES(getObject(arg12));
      };
      imports.wbg.__wbg_bindVertexArray_9971ca458d8940ea = function(arg02, arg12) {
        getObject(arg02).bindVertexArray(getObject(arg12));
      };
      imports.wbg.__wbg_bindVertexArrayOES_f7ae803496f6f82f = function(arg02, arg12) {
        getObject(arg02).bindVertexArrayOES(getObject(arg12));
      };
      imports.wbg.__wbg_clearColor_f7a4d2d6a8d8cdf6 = function(arg02, arg12, arg2, arg3, arg4) {
        getObject(arg02).clearColor(arg12, arg2, arg3, arg4);
      };
      imports.wbg.__wbg_clearColor_0af942e0c8c453eb = function(arg02, arg12, arg2, arg3, arg4) {
        getObject(arg02).clearColor(arg12, arg2, arg3, arg4);
      };
      imports.wbg.__wbg_clearDepth_48522b9afc0fcae3 = function(arg02, arg12) {
        getObject(arg02).clearDepth(arg12);
      };
      imports.wbg.__wbg_clearDepth_58463f034e740951 = function(arg02, arg12) {
        getObject(arg02).clearDepth(arg12);
      };
      imports.wbg.__wbg_clearStencil_f75695e44d9d07fb = function(arg02, arg12) {
        getObject(arg02).clearStencil(arg12);
      };
      imports.wbg.__wbg_clearStencil_170e89ddfd178df9 = function(arg02, arg12) {
        getObject(arg02).clearStencil(arg12);
      };
      imports.wbg.__wbg_clear_c5af939d0a44a025 = function(arg02, arg12) {
        getObject(arg02).clear(arg12 >>> 0);
      };
      imports.wbg.__wbg_clear_678615798766f804 = function(arg02, arg12) {
        getObject(arg02).clear(arg12 >>> 0);
      };
      imports.wbg.__wbg_pixelStorei_86e41250cf27c77f = function(arg02, arg12, arg2) {
        getObject(arg02).pixelStorei(arg12 >>> 0, arg2);
      };
      imports.wbg.__wbg_pixelStorei_1077f1f904f1a03d = function(arg02, arg12, arg2) {
        getObject(arg02).pixelStorei(arg12 >>> 0, arg2);
      };
      imports.wbg.__wbg_bufferData_074e48650ef2dd18 = function(arg02, arg12, arg2, arg3) {
        getObject(arg02).bufferData(arg12 >>> 0, arg2, arg3 >>> 0);
      };
      imports.wbg.__wbg_bufferData_d29d96e444b898a8 = function(arg02, arg12, arg2, arg3) {
        getObject(arg02).bufferData(arg12 >>> 0, arg2, arg3 >>> 0);
      };
      imports.wbg.__wbg_bufferData_11bf0e7b1bcebb55 = function(arg02, arg12, arg2, arg3) {
        getObject(arg02).bufferData(arg12 >>> 0, getObject(arg2), arg3 >>> 0);
      };
      imports.wbg.__wbg_bufferData_97b16c4aedab785a = function(arg02, arg12, arg2, arg3) {
        getObject(arg02).bufferData(arg12 >>> 0, getObject(arg2), arg3 >>> 0);
      };
      imports.wbg.__wbg_bufferSubData_75812ffb9c1cd1d4 = function(arg02, arg12, arg2, arg3) {
        getObject(arg02).bufferSubData(arg12 >>> 0, arg2, getObject(arg3));
      };
      imports.wbg.__wbg_bufferSubData_0c11461edf66f156 = function(arg02, arg12, arg2, arg3) {
        getObject(arg02).bufferSubData(arg12 >>> 0, arg2, getObject(arg3));
      };
      imports.wbg.__wbg_getBufferSubData_573ee8fa19051981 = function(arg02, arg12, arg2, arg3) {
        getObject(arg02).getBufferSubData(arg12 >>> 0, arg2, getObject(arg3));
      };
      imports.wbg.__wbg_clearBufferiv_5636255b7ffdf249 = function(arg02, arg12, arg2, arg3, arg4) {
        getObject(arg02).clearBufferiv(arg12 >>> 0, arg2, getArrayI32FromWasm0(arg3, arg4));
      };
      imports.wbg.__wbg_clearBufferuiv_8a5714476351aebf = function(arg02, arg12, arg2, arg3, arg4) {
        getObject(arg02).clearBufferuiv(arg12 >>> 0, arg2, getArrayU32FromWasm0(arg3, arg4));
      };
      imports.wbg.__wbg_clientWaitSync_d784ff3d0b4d725e = function(arg02, arg12, arg2, arg3) {
        const ret2 = getObject(arg02).clientWaitSync(getObject(arg12), arg2 >>> 0, arg3 >>> 0);
        return ret2;
      };
      imports.wbg.__wbg_copyBufferSubData_67fcdafd4e5ee17e = function(arg02, arg12, arg2, arg3, arg4, arg5) {
        getObject(arg02).copyBufferSubData(arg12 >>> 0, arg2 >>> 0, arg3, arg4, arg5);
      };
      imports.wbg.__wbg_copyTexSubImage2D_c8c32f4ef2dc582d = function(arg02, arg12, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
        getObject(arg02).copyTexSubImage2D(arg12 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8);
      };
      imports.wbg.__wbg_copyTexSubImage2D_7150b4aa99c21fde = function(arg02, arg12, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
        getObject(arg02).copyTexSubImage2D(arg12 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8);
      };
      imports.wbg.__wbg_copyTexSubImage3D_8da44b12589b4f99 = function(arg02, arg12, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
        getObject(arg02).copyTexSubImage3D(arg12 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9);
      };
      imports.wbg.__wbg_deleteBuffer_2b49293fc295ccea = function(arg02, arg12) {
        getObject(arg02).deleteBuffer(getObject(arg12));
      };
      imports.wbg.__wbg_deleteBuffer_4ab8b253a2ff7ec7 = function(arg02, arg12) {
        getObject(arg02).deleteBuffer(getObject(arg12));
      };
      imports.wbg.__wbg_deleteFramebuffer_3b2693a1a495f793 = function(arg02, arg12) {
        getObject(arg02).deleteFramebuffer(getObject(arg12));
      };
      imports.wbg.__wbg_deleteFramebuffer_a7d2812b702a9416 = function(arg02, arg12) {
        getObject(arg02).deleteFramebuffer(getObject(arg12));
      };
      imports.wbg.__wbg_deleteQuery_e5827ae2abdd5cc5 = function(arg02, arg12) {
        getObject(arg02).deleteQuery(getObject(arg12));
      };
      imports.wbg.__wbg_deleteRenderbuffer_b7ef144995140813 = function(arg02, arg12) {
        getObject(arg02).deleteRenderbuffer(getObject(arg12));
      };
      imports.wbg.__wbg_deleteRenderbuffer_fe2288d56301005f = function(arg02, arg12) {
        getObject(arg02).deleteRenderbuffer(getObject(arg12));
      };
      imports.wbg.__wbg_deleteSampler_3edc3465d87c6e64 = function(arg02, arg12) {
        getObject(arg02).deleteSampler(getObject(arg12));
      };
      imports.wbg.__wbg_deleteSync_7a5ecbff89c2476b = function(arg02, arg12) {
        getObject(arg02).deleteSync(getObject(arg12));
      };
      imports.wbg.__wbg_deleteTexture_f72079e46289ccf8 = function(arg02, arg12) {
        getObject(arg02).deleteTexture(getObject(arg12));
      };
      imports.wbg.__wbg_deleteTexture_05e26b0508f0589d = function(arg02, arg12) {
        getObject(arg02).deleteTexture(getObject(arg12));
      };
      imports.wbg.__wbg_disable_a342a9330a0cd452 = function(arg02, arg12) {
        getObject(arg02).disable(arg12 >>> 0);
      };
      imports.wbg.__wbg_disable_d0317155c2bda795 = function(arg02, arg12) {
        getObject(arg02).disable(arg12 >>> 0);
      };
      imports.wbg.__wbg_disableVertexAttribArray_636452904a337436 = function(arg02, arg12) {
        getObject(arg02).disableVertexAttribArray(arg12 >>> 0);
      };
      imports.wbg.__wbg_disableVertexAttribArray_58aa0d2748ca82d4 = function(arg02, arg12) {
        getObject(arg02).disableVertexAttribArray(arg12 >>> 0);
      };
      imports.wbg.__wbg_drawArrays_bb3d6e0af7dcb469 = function(arg02, arg12, arg2, arg3) {
        getObject(arg02).drawArrays(arg12 >>> 0, arg2, arg3);
      };
      imports.wbg.__wbg_drawArrays_af53529e509d0c8b = function(arg02, arg12, arg2, arg3) {
        getObject(arg02).drawArrays(arg12 >>> 0, arg2, arg3);
      };
      imports.wbg.__wbg_drawArraysInstancedANGLE_3b6ca9b052d4d8a2 = function(arg02, arg12, arg2, arg3, arg4) {
        getObject(arg02).drawArraysInstancedANGLE(arg12 >>> 0, arg2, arg3, arg4);
      };
      imports.wbg.__wbg_drawArraysInstanced_58629707b4b330ef = function(arg02, arg12, arg2, arg3, arg4) {
        getObject(arg02).drawArraysInstanced(arg12 >>> 0, arg2, arg3, arg4);
      };
      imports.wbg.__wbindgen_number_new = function(arg02) {
        const ret2 = arg02;
        return addHeapObject(ret2);
      };
      imports.wbg.__wbg_push_36cf4d81d7da33d1 = function(arg02, arg12) {
        const ret2 = getObject(arg02).push(getObject(arg12));
        return ret2;
      };
      imports.wbg.__wbg_of_064d1507296514c2 = function(arg02) {
        const ret2 = Array.of(getObject(arg02));
        return addHeapObject(ret2);
      };
      imports.wbg.__wbg_drawBuffersWEBGL_d616b2870195ce8e = function(arg02, arg12) {
        getObject(arg02).drawBuffersWEBGL(getObject(arg12));
      };
      imports.wbg.__wbg_drawBuffers_c5aeef68633961f5 = function(arg02, arg12) {
        getObject(arg02).drawBuffers(getObject(arg12));
      };
      imports.wbg.__wbg_drawElementsInstancedANGLE_c25bed1e47757546 = function(arg02, arg12, arg2, arg3, arg4, arg5) {
        getObject(arg02).drawElementsInstancedANGLE(arg12 >>> 0, arg2, arg3 >>> 0, arg4, arg5);
      };
      imports.wbg.__wbg_drawElementsInstanced_6bb33869244a4898 = function(arg02, arg12, arg2, arg3, arg4, arg5) {
        getObject(arg02).drawElementsInstanced(arg12 >>> 0, arg2, arg3 >>> 0, arg4, arg5);
      };
      imports.wbg.__wbg_enable_d120ad9b31220426 = function(arg02, arg12) {
        getObject(arg02).enable(arg12 >>> 0);
      };
      imports.wbg.__wbg_enable_b73a997042de6e09 = function(arg02, arg12) {
        getObject(arg02).enable(arg12 >>> 0);
      };
      imports.wbg.__wbg_enableVertexAttribArray_a12ed0a684959868 = function(arg02, arg12) {
        getObject(arg02).enableVertexAttribArray(arg12 >>> 0);
      };
      imports.wbg.__wbg_enableVertexAttribArray_08b992ae13fe30a9 = function(arg02, arg12) {
        getObject(arg02).enableVertexAttribArray(arg12 >>> 0);
      };
      imports.wbg.__wbg_framebufferRenderbuffer_b3aa0a942c6bdcc5 = function(arg02, arg12, arg2, arg3, arg4) {
        getObject(arg02).framebufferRenderbuffer(arg12 >>> 0, arg2 >>> 0, arg3 >>> 0, getObject(arg4));
      };
      imports.wbg.__wbg_framebufferRenderbuffer_a2b559ae4519abb6 = function(arg02, arg12, arg2, arg3, arg4) {
        getObject(arg02).framebufferRenderbuffer(arg12 >>> 0, arg2 >>> 0, arg3 >>> 0, getObject(arg4));
      };
      imports.wbg.__wbg_framebufferTexture2D_d190f9f327cc46ec = function(arg02, arg12, arg2, arg3, arg4, arg5) {
        getObject(arg02).framebufferTexture2D(arg12 >>> 0, arg2 >>> 0, arg3 >>> 0, getObject(arg4), arg5);
      };
      imports.wbg.__wbg_framebufferTexture2D_8edd7a84454a0f67 = function(arg02, arg12, arg2, arg3, arg4, arg5) {
        getObject(arg02).framebufferTexture2D(arg12 >>> 0, arg2 >>> 0, arg3 >>> 0, getObject(arg4), arg5);
      };
      imports.wbg.__wbg_framebufferTextureLayer_553e4303fd9ac85d = function(arg02, arg12, arg2, arg3, arg4, arg5) {
        getObject(arg02).framebufferTextureLayer(arg12 >>> 0, arg2 >>> 0, getObject(arg3), arg4, arg5);
      };
      imports.wbg.__wbg_frontFace_380eb97b8e84036d = function(arg02, arg12) {
        getObject(arg02).frontFace(arg12 >>> 0);
      };
      imports.wbg.__wbg_frontFace_2f9be9f6e61eab57 = function(arg02, arg12) {
        getObject(arg02).frontFace(arg12 >>> 0);
      };
      imports.wbg.__wbg_getParameter_21bd0c7970e3e51c = function() {
        return handleError(function(arg02, arg12) {
          const ret2 = getObject(arg02).getParameter(arg12 >>> 0);
          return addHeapObject(ret2);
        }, arguments);
      };
      imports.wbg.__wbg_getIndexedParameter_c046ce18fdfe2dd2 = function() {
        return handleError(function(arg02, arg12, arg2) {
          const ret2 = getObject(arg02).getIndexedParameter(arg12 >>> 0, arg2 >>> 0);
          return addHeapObject(ret2);
        }, arguments);
      };
      imports.wbg.__wbg_getUniformLocation_f600c2277dd826b4 = function(arg02, arg12, arg2, arg3) {
        const ret2 = getObject(arg02).getUniformLocation(getObject(arg12), getStringFromWasm0(arg2, arg3));
        return isLikeNone(ret2) ? 0 : addHeapObject(ret2);
      };
      imports.wbg.__wbg_getUniformLocation_74149153bba4c4cb = function(arg02, arg12, arg2, arg3) {
        const ret2 = getObject(arg02).getUniformLocation(getObject(arg12), getStringFromWasm0(arg2, arg3));
        return isLikeNone(ret2) ? 0 : addHeapObject(ret2);
      };
      imports.wbg.__wbg_bindAttribLocation_5f1fbf398e621d36 = function(arg02, arg12, arg2, arg3, arg4) {
        getObject(arg02).bindAttribLocation(getObject(arg12), arg2 >>> 0, getStringFromWasm0(arg3, arg4));
      };
      imports.wbg.__wbg_bindAttribLocation_76abc768e01a6a90 = function(arg02, arg12, arg2, arg3, arg4) {
        getObject(arg02).bindAttribLocation(getObject(arg12), arg2 >>> 0, getStringFromWasm0(arg3, arg4));
      };
      imports.wbg.__wbg_getSyncParameter_c832b09cdf83e9a1 = function(arg02, arg12, arg2) {
        const ret2 = getObject(arg02).getSyncParameter(getObject(arg12), arg2 >>> 0);
        return addHeapObject(ret2);
      };
      imports.wbg.__wbg_renderbufferStorage_cf618d17929fccad = function(arg02, arg12, arg2, arg3, arg4) {
        getObject(arg02).renderbufferStorage(arg12 >>> 0, arg2 >>> 0, arg3, arg4);
      };
      imports.wbg.__wbg_renderbufferStorage_822379366751a4aa = function(arg02, arg12, arg2, arg3, arg4) {
        getObject(arg02).renderbufferStorage(arg12 >>> 0, arg2 >>> 0, arg3, arg4);
      };
      imports.wbg.__wbg_renderbufferStorageMultisample_fe52b83cbe6a1263 = function(arg02, arg12, arg2, arg3, arg4, arg5) {
        getObject(arg02).renderbufferStorageMultisample(arg12 >>> 0, arg2, arg3 >>> 0, arg4, arg5);
      };
      imports.wbg.__wbg_samplerParameterf_8e3f1f759df1f227 = function(arg02, arg12, arg2, arg3) {
        getObject(arg02).samplerParameterf(getObject(arg12), arg2 >>> 0, arg3);
      };
      imports.wbg.__wbg_samplerParameteri_bba8403da2e67783 = function(arg02, arg12, arg2, arg3) {
        getObject(arg02).samplerParameteri(getObject(arg12), arg2 >>> 0, arg3);
      };
      imports.wbg.__wbg_texImage3D_6371804354a63939 = function() {
        return handleError(function(arg02, arg12, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
          getObject(arg02).texImage3D(arg12 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8 >>> 0, arg9 >>> 0, getObject(arg10));
        }, arguments);
      };
      imports.wbg.__wbg_texStorage2D_d7ea0bec2ad1d754 = function(arg02, arg12, arg2, arg3, arg4, arg5) {
        getObject(arg02).texStorage2D(arg12 >>> 0, arg2, arg3 >>> 0, arg4, arg5);
      };
      imports.wbg.__wbg_texStorage3D_c78e9d392c9afef5 = function(arg02, arg12, arg2, arg3, arg4, arg5, arg6) {
        getObject(arg02).texStorage3D(arg12 >>> 0, arg2, arg3 >>> 0, arg4, arg5, arg6);
      };
      imports.wbg.__wbg_uniform1i_55c667a20431c589 = function(arg02, arg12, arg2) {
        getObject(arg02).uniform1i(getObject(arg12), arg2);
      };
      imports.wbg.__wbg_uniform1i_b7abcc7b3b4aee52 = function(arg02, arg12, arg2) {
        getObject(arg02).uniform1i(getObject(arg12), arg2);
      };
      imports.wbg.__wbg_uniform2iv_381ff23066f6a1b5 = function(arg02, arg12, arg2, arg3) {
        getObject(arg02).uniform2iv(getObject(arg12), getArrayI32FromWasm0(arg2, arg3));
      };
      imports.wbg.__wbg_uniform2iv_a3a3a2d9dd160669 = function(arg02, arg12, arg2, arg3) {
        getObject(arg02).uniform2iv(getObject(arg12), getArrayI32FromWasm0(arg2, arg3));
      };
      imports.wbg.__wbg_uniform3iv_2e1c0ab4a03ec4ce = function(arg02, arg12, arg2, arg3) {
        getObject(arg02).uniform3iv(getObject(arg12), getArrayI32FromWasm0(arg2, arg3));
      };
      imports.wbg.__wbg_uniform3iv_dd1472a6dabcbacf = function(arg02, arg12, arg2, arg3) {
        getObject(arg02).uniform3iv(getObject(arg12), getArrayI32FromWasm0(arg2, arg3));
      };
      imports.wbg.__wbg_uniform4iv_4d0ac6295a7128b4 = function(arg02, arg12, arg2, arg3) {
        getObject(arg02).uniform4iv(getObject(arg12), getArrayI32FromWasm0(arg2, arg3));
      };
      imports.wbg.__wbg_uniform4iv_5eb5f6d6b8f7b5eb = function(arg02, arg12, arg2, arg3) {
        getObject(arg02).uniform4iv(getObject(arg12), getArrayI32FromWasm0(arg2, arg3));
      };
      imports.wbg.__wbg_uniform1ui_db9ba46f665c3c8d = function(arg02, arg12, arg2) {
        getObject(arg02).uniform1ui(getObject(arg12), arg2 >>> 0);
      };
      imports.wbg.__wbg_uniform2uiv_b9b0306bb5a34533 = function(arg02, arg12, arg2, arg3) {
        getObject(arg02).uniform2uiv(getObject(arg12), getArrayU32FromWasm0(arg2, arg3));
      };
      imports.wbg.__wbg_uniform3uiv_19d2c541c5b13765 = function(arg02, arg12, arg2, arg3) {
        getObject(arg02).uniform3uiv(getObject(arg12), getArrayU32FromWasm0(arg2, arg3));
      };
      imports.wbg.__wbg_uniform4uiv_cf3029bbfadb5167 = function(arg02, arg12, arg2, arg3) {
        getObject(arg02).uniform4uiv(getObject(arg12), getArrayU32FromWasm0(arg2, arg3));
      };
      imports.wbg.__wbg_uniform1f_800970b4947e87c4 = function(arg02, arg12, arg2) {
        getObject(arg02).uniform1f(getObject(arg12), arg2);
      };
      imports.wbg.__wbg_uniform1f_d2ba9f3d60c3859c = function(arg02, arg12, arg2) {
        getObject(arg02).uniform1f(getObject(arg12), arg2);
      };
      imports.wbg.__wbg_uniform4f_13782133211399be = function(arg02, arg12, arg2, arg3, arg4, arg5) {
        getObject(arg02).uniform4f(getObject(arg12), arg2, arg3, arg4, arg5);
      };
      imports.wbg.__wbg_uniform4f_7e85e8eb9dff7886 = function(arg02, arg12, arg2, arg3, arg4, arg5) {
        getObject(arg02).uniform4f(getObject(arg12), arg2, arg3, arg4, arg5);
      };
      imports.wbg.__wbg_uniform2fv_9a442fc12ac6908d = function(arg02, arg12, arg2, arg3) {
        getObject(arg02).uniform2fv(getObject(arg12), getArrayF32FromWasm0(arg2, arg3));
      };
      imports.wbg.__wbg_uniform2fv_ee34c52d95d497de = function(arg02, arg12, arg2, arg3) {
        getObject(arg02).uniform2fv(getObject(arg12), getArrayF32FromWasm0(arg2, arg3));
      };
      imports.wbg.__wbg_uniform3fv_00fe7be94f38d819 = function(arg02, arg12, arg2, arg3) {
        getObject(arg02).uniform3fv(getObject(arg12), getArrayF32FromWasm0(arg2, arg3));
      };
      imports.wbg.__wbg_uniform3fv_560886b2a558fa83 = function(arg02, arg12, arg2, arg3) {
        getObject(arg02).uniform3fv(getObject(arg12), getArrayF32FromWasm0(arg2, arg3));
      };
      imports.wbg.__wbg_uniform4fv_a4022bbb233e7635 = function(arg02, arg12, arg2, arg3) {
        getObject(arg02).uniform4fv(getObject(arg12), getArrayF32FromWasm0(arg2, arg3));
      };
      imports.wbg.__wbg_uniform4fv_b355da0bf0a80967 = function(arg02, arg12, arg2, arg3) {
        getObject(arg02).uniform4fv(getObject(arg12), getArrayF32FromWasm0(arg2, arg3));
      };
      imports.wbg.__wbg_uniformMatrix2fv_d8a8d5939ca67037 = function(arg02, arg12, arg2, arg3, arg4) {
        getObject(arg02).uniformMatrix2fv(getObject(arg12), arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
      };
      imports.wbg.__wbg_uniformMatrix2fv_65856c74b9e6fe59 = function(arg02, arg12, arg2, arg3, arg4) {
        getObject(arg02).uniformMatrix2fv(getObject(arg12), arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
      };
      imports.wbg.__wbg_uniformMatrix2x3fv_c5b0f3b7ad9c9d70 = function(arg02, arg12, arg2, arg3, arg4) {
        getObject(arg02).uniformMatrix2x3fv(getObject(arg12), arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
      };
      imports.wbg.__wbg_uniformMatrix2x4fv_45b56d62d9b54f07 = function(arg02, arg12, arg2, arg3, arg4) {
        getObject(arg02).uniformMatrix2x4fv(getObject(arg12), arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
      };
      imports.wbg.__wbg_uniformMatrix3x2fv_8ec31c1c6e15f466 = function(arg02, arg12, arg2, arg3, arg4) {
        getObject(arg02).uniformMatrix3x2fv(getObject(arg12), arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
      };
      imports.wbg.__wbg_uniformMatrix3fv_2e2aa0a9cc686289 = function(arg02, arg12, arg2, arg3, arg4) {
        getObject(arg02).uniformMatrix3fv(getObject(arg12), arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
      };
      imports.wbg.__wbg_uniformMatrix3fv_4409fe9c61d17bae = function(arg02, arg12, arg2, arg3, arg4) {
        getObject(arg02).uniformMatrix3fv(getObject(arg12), arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
      };
      imports.wbg.__wbg_uniformMatrix3x4fv_f4747cbe196496d7 = function(arg02, arg12, arg2, arg3, arg4) {
        getObject(arg02).uniformMatrix3x4fv(getObject(arg12), arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
      };
      imports.wbg.__wbg_uniformMatrix4x2fv_995a5133239fcdf8 = function(arg02, arg12, arg2, arg3, arg4) {
        getObject(arg02).uniformMatrix4x2fv(getObject(arg12), arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
      };
      imports.wbg.__wbg_uniformMatrix4x3fv_55fdabeba339030e = function(arg02, arg12, arg2, arg3, arg4) {
        getObject(arg02).uniformMatrix4x3fv(getObject(arg12), arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
      };
      imports.wbg.__wbg_uniformMatrix4fv_7c95912c063d4e2b = function(arg02, arg12, arg2, arg3, arg4) {
        getObject(arg02).uniformMatrix4fv(getObject(arg12), arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
      };
      imports.wbg.__wbg_uniformMatrix4fv_5bf1d4fcb9b38046 = function(arg02, arg12, arg2, arg3, arg4) {
        getObject(arg02).uniformMatrix4fv(getObject(arg12), arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
      };
      imports.wbg.__wbg_cullFace_e6b0b54ef3b7307c = function(arg02, arg12) {
        getObject(arg02).cullFace(arg12 >>> 0);
      };
      imports.wbg.__wbg_cullFace_32ec426f9cf738ba = function(arg02, arg12) {
        getObject(arg02).cullFace(arg12 >>> 0);
      };
      imports.wbg.__wbg_colorMask_f1fbf32fb9ff5f55 = function(arg02, arg12, arg2, arg3, arg4) {
        getObject(arg02).colorMask(arg12 !== 0, arg2 !== 0, arg3 !== 0, arg4 !== 0);
      };
      imports.wbg.__wbg_colorMask_88c579e312b0fdcf = function(arg02, arg12, arg2, arg3, arg4) {
        getObject(arg02).colorMask(arg12 !== 0, arg2 !== 0, arg3 !== 0, arg4 !== 0);
      };
      imports.wbg.__wbg_depthMask_621842c53eaaf9cb = function(arg02, arg12) {
        getObject(arg02).depthMask(arg12 !== 0);
      };
      imports.wbg.__wbg_depthMask_e4963468d5b609c0 = function(arg02, arg12) {
        getObject(arg02).depthMask(arg12 !== 0);
      };
      imports.wbg.__wbg_blendColor_edc626d0dcb0353d = function(arg02, arg12, arg2, arg3, arg4) {
        getObject(arg02).blendColor(arg12, arg2, arg3, arg4);
      };
      imports.wbg.__wbg_blendColor_82a78d74caf24e36 = function(arg02, arg12, arg2, arg3, arg4) {
        getObject(arg02).blendColor(arg12, arg2, arg3, arg4);
      };
      imports.wbg.__wbg_invalidateFramebuffer_85aacd2d6706f92c = function() {
        return handleError(function(arg02, arg12, arg2) {
          getObject(arg02).invalidateFramebuffer(arg12 >>> 0, getObject(arg2));
        }, arguments);
      };
      imports.wbg.__wbg_polygonOffset_473b27921774b31d = function(arg02, arg12, arg2) {
        getObject(arg02).polygonOffset(arg12, arg2);
      };
      imports.wbg.__wbg_polygonOffset_1b4508ccdc143fe7 = function(arg02, arg12, arg2) {
        getObject(arg02).polygonOffset(arg12, arg2);
      };
      imports.wbg.__wbg_bindTexture_78210066cfdda8ac = function(arg02, arg12, arg2) {
        getObject(arg02).bindTexture(arg12 >>> 0, getObject(arg2));
      };
      imports.wbg.__wbg_bindTexture_578ab0356afb56df = function(arg02, arg12, arg2) {
        getObject(arg02).bindTexture(arg12 >>> 0, getObject(arg2));
      };
      imports.wbg.__wbg_bindSampler_e6594b2914f5003c = function(arg02, arg12, arg2) {
        getObject(arg02).bindSampler(arg12 >>> 0, getObject(arg2));
      };
      imports.wbg.__wbg_activeTexture_b0bb95e7b2c13666 = function(arg02, arg12) {
        getObject(arg02).activeTexture(arg12 >>> 0);
      };
      imports.wbg.__wbg_activeTexture_a2e9931456fe92b4 = function(arg02, arg12) {
        getObject(arg02).activeTexture(arg12 >>> 0);
      };
      imports.wbg.__wbg_fenceSync_e39c9079309664a2 = function(arg02, arg12, arg2) {
        const ret2 = getObject(arg02).fenceSync(arg12 >>> 0, arg2 >>> 0);
        return isLikeNone(ret2) ? 0 : addHeapObject(ret2);
      };
      imports.wbg.__wbg_texParameteri_72793934be86cdcf = function(arg02, arg12, arg2, arg3) {
        getObject(arg02).texParameteri(arg12 >>> 0, arg2 >>> 0, arg3);
      };
      imports.wbg.__wbg_texParameteri_a73df30f47a92fec = function(arg02, arg12, arg2, arg3) {
        getObject(arg02).texParameteri(arg12 >>> 0, arg2 >>> 0, arg3);
      };
      imports.wbg.__wbg_texSubImage2D_e784b7363b6c212d = function() {
        return handleError(function(arg02, arg12, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
          getObject(arg02).texSubImage2D(arg12 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, getObject(arg9));
        }, arguments);
      };
      imports.wbg.__wbg_texSubImage2D_97bed542c038dfb5 = function() {
        return handleError(function(arg02, arg12, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
          getObject(arg02).texSubImage2D(arg12 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, getObject(arg9));
        }, arguments);
      };
      imports.wbg.__wbg_texSubImage2D_74255449b4229fd1 = function() {
        return handleError(function(arg02, arg12, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
          getObject(arg02).texSubImage2D(arg12 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
        }, arguments);
      };
      imports.wbg.__wbg_compressedTexSubImage2D_bd83f8f696b6d591 = function(arg02, arg12, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
        getObject(arg02).compressedTexSubImage2D(arg12 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, getObject(arg8));
      };
      imports.wbg.__wbg_compressedTexSubImage2D_a6583905f3a9480f = function(arg02, arg12, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
        getObject(arg02).compressedTexSubImage2D(arg12 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, getObject(arg8));
      };
      imports.wbg.__wbg_compressedTexSubImage2D_568fabb4a468221c = function(arg02, arg12, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
        getObject(arg02).compressedTexSubImage2D(arg12 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8, arg9);
      };
      imports.wbg.__wbg_texSubImage3D_b1219aeae15b17e7 = function() {
        return handleError(function(arg02, arg12, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
          getObject(arg02).texSubImage3D(arg12 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0, arg11);
        }, arguments);
      };
      imports.wbg.__wbg_texSubImage3D_772730c836caeb64 = function() {
        return handleError(function(arg02, arg12, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
          getObject(arg02).texSubImage3D(arg12 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0, getObject(arg11));
        }, arguments);
      };
      imports.wbg.__wbg_compressedTexSubImage3D_a61af2271039d4bf = function(arg02, arg12, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
        getObject(arg02).compressedTexSubImage3D(arg12 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10, arg11);
      };
      imports.wbg.__wbg_compressedTexSubImage3D_a73e16b704a1d1d5 = function(arg02, arg12, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
        getObject(arg02).compressedTexSubImage3D(arg12 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, getObject(arg10));
      };
      imports.wbg.__wbg_depthFunc_c3a66baecbd39fce = function(arg02, arg12) {
        getObject(arg02).depthFunc(arg12 >>> 0);
      };
      imports.wbg.__wbg_depthFunc_7589bc6d5bb03a9b = function(arg02, arg12) {
        getObject(arg02).depthFunc(arg12 >>> 0);
      };
      imports.wbg.__wbg_depthRange_89d7e77aac8924b5 = function(arg02, arg12, arg2) {
        getObject(arg02).depthRange(arg12, arg2);
      };
      imports.wbg.__wbg_depthRange_ee8b5b65dd5c7ea2 = function(arg02, arg12, arg2) {
        getObject(arg02).depthRange(arg12, arg2);
      };
      imports.wbg.__wbg_scissor_f1b8dd095e3fa77a = function(arg02, arg12, arg2, arg3, arg4) {
        getObject(arg02).scissor(arg12, arg2, arg3, arg4);
      };
      imports.wbg.__wbg_scissor_3cdd53b98aa49fb5 = function(arg02, arg12, arg2, arg3, arg4) {
        getObject(arg02).scissor(arg12, arg2, arg3, arg4);
      };
      imports.wbg.__wbg_vertexAttribDivisorANGLE_7b5fc471794338ce = function(arg02, arg12, arg2) {
        getObject(arg02).vertexAttribDivisorANGLE(arg12 >>> 0, arg2 >>> 0);
      };
      imports.wbg.__wbg_vertexAttribDivisor_657bb3e5aaa0a9d0 = function(arg02, arg12, arg2) {
        getObject(arg02).vertexAttribDivisor(arg12 >>> 0, arg2 >>> 0);
      };
      imports.wbg.__wbg_vertexAttribPointer_6e1de5dfe082f820 = function(arg02, arg12, arg2, arg3, arg4, arg5, arg6) {
        getObject(arg02).vertexAttribPointer(arg12 >>> 0, arg2, arg3 >>> 0, arg4 !== 0, arg5, arg6);
      };
      imports.wbg.__wbg_vertexAttribPointer_f602d22ecb0758f6 = function(arg02, arg12, arg2, arg3, arg4, arg5, arg6) {
        getObject(arg02).vertexAttribPointer(arg12 >>> 0, arg2, arg3 >>> 0, arg4 !== 0, arg5, arg6);
      };
      imports.wbg.__wbg_vertexAttribIPointer_9ce0758a819f9ebd = function(arg02, arg12, arg2, arg3, arg4, arg5) {
        getObject(arg02).vertexAttribIPointer(arg12 >>> 0, arg2, arg3 >>> 0, arg4, arg5);
      };
      imports.wbg.__wbg_viewport_567a7a444dd3650b = function(arg02, arg12, arg2, arg3, arg4) {
        getObject(arg02).viewport(arg12, arg2, arg3, arg4);
      };
      imports.wbg.__wbg_viewport_e333f63662d91f3a = function(arg02, arg12, arg2, arg3, arg4) {
        getObject(arg02).viewport(arg12, arg2, arg3, arg4);
      };
      imports.wbg.__wbg_blendFunc_a0cad1569253dd9b = function(arg02, arg12, arg2) {
        getObject(arg02).blendFunc(arg12 >>> 0, arg2 >>> 0);
      };
      imports.wbg.__wbg_blendFunc_fc7489df4b31e3ec = function(arg02, arg12, arg2) {
        getObject(arg02).blendFunc(arg12 >>> 0, arg2 >>> 0);
      };
      imports.wbg.__wbg_blendFuncSeparate_54734c3d5f7ec376 = function(arg02, arg12, arg2, arg3, arg4) {
        getObject(arg02).blendFuncSeparate(arg12 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
      };
      imports.wbg.__wbg_blendFuncSeparate_79ff089d1b7d8fdd = function(arg02, arg12, arg2, arg3, arg4) {
        getObject(arg02).blendFuncSeparate(arg12 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
      };
      imports.wbg.__wbg_blendEquation_3d98c2e4520f67f0 = function(arg02, arg12) {
        getObject(arg02).blendEquation(arg12 >>> 0);
      };
      imports.wbg.__wbg_blendEquation_99ed9620b96c3390 = function(arg02, arg12) {
        getObject(arg02).blendEquation(arg12 >>> 0);
      };
      imports.wbg.__wbg_blendEquationSeparate_4dba689f460b83c7 = function(arg02, arg12, arg2) {
        getObject(arg02).blendEquationSeparate(arg12 >>> 0, arg2 >>> 0);
      };
      imports.wbg.__wbg_blendEquationSeparate_f31b2648426dff95 = function(arg02, arg12, arg2) {
        getObject(arg02).blendEquationSeparate(arg12 >>> 0, arg2 >>> 0);
      };
      imports.wbg.__wbg_stencilFuncSeparate_ce7a3a558108c580 = function(arg02, arg12, arg2, arg3, arg4) {
        getObject(arg02).stencilFuncSeparate(arg12 >>> 0, arg2 >>> 0, arg3, arg4 >>> 0);
      };
      imports.wbg.__wbg_stencilFuncSeparate_f70a2363259de010 = function(arg02, arg12, arg2, arg3, arg4) {
        getObject(arg02).stencilFuncSeparate(arg12 >>> 0, arg2 >>> 0, arg3, arg4 >>> 0);
      };
      imports.wbg.__wbg_stencilMask_90c593098dd34f2c = function(arg02, arg12) {
        getObject(arg02).stencilMask(arg12 >>> 0);
      };
      imports.wbg.__wbg_stencilMask_87e5dfdb3daacf5d = function(arg02, arg12) {
        getObject(arg02).stencilMask(arg12 >>> 0);
      };
      imports.wbg.__wbg_stencilMaskSeparate_bc74c4776009bfc5 = function(arg02, arg12, arg2) {
        getObject(arg02).stencilMaskSeparate(arg12 >>> 0, arg2 >>> 0);
      };
      imports.wbg.__wbg_stencilMaskSeparate_03f10bfd58cf3e1e = function(arg02, arg12, arg2) {
        getObject(arg02).stencilMaskSeparate(arg12 >>> 0, arg2 >>> 0);
      };
      imports.wbg.__wbg_stencilOpSeparate_86845a9132af3755 = function(arg02, arg12, arg2, arg3, arg4) {
        getObject(arg02).stencilOpSeparate(arg12 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
      };
      imports.wbg.__wbg_stencilOpSeparate_14c4ac8259d6ae13 = function(arg02, arg12, arg2, arg3, arg4) {
        getObject(arg02).stencilOpSeparate(arg12 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
      };
      imports.wbg.__wbg_getUniformBlockIndex_58495b7e010514a3 = function(arg02, arg12, arg2, arg3) {
        const ret2 = getObject(arg02).getUniformBlockIndex(getObject(arg12), getStringFromWasm0(arg2, arg3));
        return ret2;
      };
      imports.wbg.__wbg_uniformBlockBinding_7ce0de2472517231 = function(arg02, arg12, arg2, arg3) {
        getObject(arg02).uniformBlockBinding(getObject(arg12), arg2 >>> 0, arg3 >>> 0);
      };
      imports.wbg.__wbg_readBuffer_3be142023c4594fe = function(arg02, arg12) {
        getObject(arg02).readBuffer(arg12 >>> 0);
      };
      imports.wbg.__wbg_readPixels_9a37d680e1902966 = function() {
        return handleError(function(arg02, arg12, arg2, arg3, arg4, arg5, arg6, arg7) {
          getObject(arg02).readPixels(arg12, arg2, arg3, arg4, arg5 >>> 0, arg6 >>> 0, arg7);
        }, arguments);
      };
      imports.wbg.__wbg_readPixels_f1573092ee7b3fc7 = function() {
        return handleError(function(arg02, arg12, arg2, arg3, arg4, arg5, arg6, arg7) {
          getObject(arg02).readPixels(arg12, arg2, arg3, arg4, arg5 >>> 0, arg6 >>> 0, getObject(arg7));
        }, arguments);
      };
      imports.wbg.__wbg_readPixels_4e84fb582bf012e3 = function() {
        return handleError(function(arg02, arg12, arg2, arg3, arg4, arg5, arg6, arg7) {
          getObject(arg02).readPixels(arg12, arg2, arg3, arg4, arg5 >>> 0, arg6 >>> 0, getObject(arg7));
        }, arguments);
      };
      imports.wbg.__wbg_beginQuery_b8e402f471b94597 = function(arg02, arg12, arg2) {
        getObject(arg02).beginQuery(arg12 >>> 0, getObject(arg2));
      };
      imports.wbg.__wbg_endQuery_0abcffd7cf85f99b = function(arg02, arg12) {
        getObject(arg02).endQuery(arg12 >>> 0);
      };
      imports.wbg.__wbg_getQueryParameter_7a26f48a8e221c3e = function(arg02, arg12, arg2) {
        const ret2 = getObject(arg02).getQueryParameter(getObject(arg12), arg2 >>> 0);
        return addHeapObject(ret2);
      };
      imports.wbg.__wbg_self_bf91bf94d9e04084 = function() {
        return handleError(function() {
          const ret2 = self.self;
          return addHeapObject(ret2);
        }, arguments);
      };
      imports.wbg.__wbg_window_52dd9f07d03fd5f8 = function() {
        return handleError(function() {
          const ret2 = window.window;
          return addHeapObject(ret2);
        }, arguments);
      };
      imports.wbg.__wbg_globalThis_05c129bf37fcf1be = function() {
        return handleError(function() {
          const ret2 = globalThis.globalThis;
          return addHeapObject(ret2);
        }, arguments);
      };
      imports.wbg.__wbg_global_3eca19bb09e9c484 = function() {
        return handleError(function() {
          const ret2 = global.global;
          return addHeapObject(ret2);
        }, arguments);
      };
      imports.wbg.__wbg_newnoargs_1ede4bf2ebbaaf43 = function(arg02, arg12) {
        const ret2 = new Function(getStringFromWasm0(arg02, arg12));
        return addHeapObject(ret2);
      };
      imports.wbg.__wbg_call_a9ef466721e824f2 = function() {
        return handleError(function(arg02, arg12) {
          const ret2 = getObject(arg02).call(getObject(arg12));
          return addHeapObject(ret2);
        }, arguments);
      };
      imports.wbg.__wbg_of_7e03bb557d6a64cc = function(arg02, arg12) {
        const ret2 = Array.of(getObject(arg02), getObject(arg12));
        return addHeapObject(ret2);
      };
      imports.wbg.__wbg_call_3bfa248576352471 = function() {
        return handleError(function(arg02, arg12, arg2) {
          const ret2 = getObject(arg02).call(getObject(arg12), getObject(arg2));
          return addHeapObject(ret2);
        }, arguments);
      };
      imports.wbg.__wbg_getOwnPropertyDescriptor_419345cdc0d1ec14 = function(arg02, arg12) {
        const ret2 = Object.getOwnPropertyDescriptor(getObject(arg02), getObject(arg12));
        return addHeapObject(ret2);
      };
      imports.wbg.__wbg_is_4b64bc96710d6a0f = function(arg02, arg12) {
        const ret2 = Object.is(getObject(arg02), getObject(arg12));
        return ret2;
      };
      imports.wbg.__wbg_new_e69b5f66fda8f13c = function() {
        const ret2 = new Object();
        return addHeapObject(ret2);
      };
      imports.wbg.__wbg_resolve_0aad7c1484731c99 = function(arg02) {
        const ret2 = Promise.resolve(getObject(arg02));
        return addHeapObject(ret2);
      };
      imports.wbg.__wbg_catch_8097da4375a5dd1b = function(arg02, arg12) {
        const ret2 = getObject(arg02).catch(getObject(arg12));
        return addHeapObject(ret2);
      };
      imports.wbg.__wbg_then_748f75edfb032440 = function(arg02, arg12) {
        const ret2 = getObject(arg02).then(getObject(arg12));
        return addHeapObject(ret2);
      };
      imports.wbg.__wbg_then_4866a7d9f55d8f3e = function(arg02, arg12, arg2) {
        const ret2 = getObject(arg02).then(getObject(arg12), getObject(arg2));
        return addHeapObject(ret2);
      };
      imports.wbg.__wbindgen_memory = function() {
        const ret2 = wasm.memory;
        return addHeapObject(ret2);
      };
      imports.wbg.__wbg_buffer_ccaed51a635d8a2d = function(arg02) {
        const ret2 = getObject(arg02).buffer;
        return addHeapObject(ret2);
      };
      imports.wbg.__wbg_newwithbyteoffsetandlength_a477014f6b279082 = function(arg02, arg12, arg2) {
        const ret2 = new Int8Array(getObject(arg02), arg12 >>> 0, arg2 >>> 0);
        return addHeapObject(ret2);
      };
      imports.wbg.__wbg_newwithbyteoffsetandlength_2162229fb032f49b = function(arg02, arg12, arg2) {
        const ret2 = new Int16Array(getObject(arg02), arg12 >>> 0, arg2 >>> 0);
        return addHeapObject(ret2);
      };
      imports.wbg.__wbg_newwithbyteoffsetandlength_98f18acc088b651f = function(arg02, arg12, arg2) {
        const ret2 = new Int32Array(getObject(arg02), arg12 >>> 0, arg2 >>> 0);
        return addHeapObject(ret2);
      };
      imports.wbg.__wbg_newwithbyteoffsetandlength_7e3eb787208af730 = function(arg02, arg12, arg2) {
        const ret2 = new Uint8Array(getObject(arg02), arg12 >>> 0, arg2 >>> 0);
        return addHeapObject(ret2);
      };
      imports.wbg.__wbg_set_ec2fcf81bc573fd9 = function(arg02, arg12, arg2) {
        getObject(arg02).set(getObject(arg12), arg2 >>> 0);
      };
      imports.wbg.__wbg_length_9254c4bd3b9f23c4 = function(arg02) {
        const ret2 = getObject(arg02).length;
        return ret2;
      };
      imports.wbg.__wbg_newwithbyteoffsetandlength_e74b33a1f7565139 = function(arg02, arg12, arg2) {
        const ret2 = new Uint16Array(getObject(arg02), arg12 >>> 0, arg2 >>> 0);
        return addHeapObject(ret2);
      };
      imports.wbg.__wbg_newwithbyteoffsetandlength_5f67057565ba35bf = function(arg02, arg12, arg2) {
        const ret2 = new Uint32Array(getObject(arg02), arg12 >>> 0, arg2 >>> 0);
        return addHeapObject(ret2);
      };
      imports.wbg.__wbg_newwithbyteoffsetandlength_fc445c2d308275d0 = function(arg02, arg12, arg2) {
        const ret2 = new Float32Array(getObject(arg02), arg12 >>> 0, arg2 >>> 0);
        return addHeapObject(ret2);
      };
      imports.wbg.__wbg_set_e864d25d9b399c9f = function() {
        return handleError(function(arg02, arg12, arg2) {
          const ret2 = Reflect.set(getObject(arg02), getObject(arg12), getObject(arg2));
          return ret2;
        }, arguments);
      };
      imports.wbg.__wbg_setsamplerate_8b48d6e377fe52c9 = function(arg02, arg12) {
        getObject(arg02).sampleRate = arg12;
      };
      imports.wbg.__wbg_newwithcontextoptions_f939c627726d873f = function() {
        return handleError(function(arg02) {
          const ret2 = new lAudioContext(getObject(arg02));
          return addHeapObject(ret2);
        }, arguments);
      };
      imports.wbg.__wbg_destination_f7f82a0a30ca8bba = function(arg02) {
        const ret2 = getObject(arg02).destination;
        return addHeapObject(ret2);
      };
      imports.wbg.__wbg_maxChannelCount_af37d88907a11748 = function(arg02) {
        const ret2 = getObject(arg02).maxChannelCount;
        return ret2;
      };
      imports.wbg.__wbg_setchannelCount_84446ba10ba82eb1 = function(arg02, arg12) {
        getObject(arg02).channelCount = arg12 >>> 0;
      };
      imports.wbg.__wbg_createBuffer_8acdf99f8dc5d697 = function() {
        return handleError(function(arg02, arg12, arg2, arg3) {
          const ret2 = getObject(arg02).createBuffer(arg12 >>> 0, arg2 >>> 0, arg3);
          return addHeapObject(ret2);
        }, arguments);
      };
      imports.wbg.__wbg_currentTime_a3102f1ef74fca96 = function(arg02) {
        const ret2 = getObject(arg02).currentTime;
        return ret2;
      };
      imports.wbg.__wbg_createBufferSource_ed2df6b1d0df0f14 = function() {
        return handleError(function(arg02) {
          const ret2 = getObject(arg02).createBufferSource();
          return addHeapObject(ret2);
        }, arguments);
      };
      imports.wbg.__wbg_setbuffer_f4457f8f6a733e5a = function(arg02, arg12) {
        getObject(arg02).buffer = getObject(arg12);
      };
      imports.wbg.__wbg_connect_9a09c3bcaa0c9d22 = function() {
        return handleError(function(arg02, arg12) {
          const ret2 = getObject(arg02).connect(getObject(arg12));
          return addHeapObject(ret2);
        }, arguments);
      };
      imports.wbg.__wbg_setonended_95d7e5856cbda569 = function(arg02, arg12) {
        getObject(arg02).onended = getObject(arg12);
      };
      imports.wbg.__wbg_start_c5bab011493fb2be = function() {
        return handleError(function(arg02, arg12) {
          getObject(arg02).start(arg12);
        }, arguments);
      };
      imports.wbg.__wbg_copyToChannel_4f1f6f3395215459 = function() {
        return handleError(function(arg02, arg12, arg2, arg3) {
          getObject(arg02).copyToChannel(getArrayF32FromWasm0(arg12, arg2), arg3);
        }, arguments);
      };
      imports.wbg.__wbg_measure_aa7a73f17813f708 = function() {
        return handleError(function(arg02, arg12, arg2, arg3) {
          let deferred0_0;
          let deferred0_1;
          let deferred1_0;
          let deferred1_1;
          try {
            deferred0_0 = arg02;
            deferred0_1 = arg12;
            deferred1_0 = arg2;
            deferred1_1 = arg3;
            performance.measure(getStringFromWasm0(arg02, arg12), getStringFromWasm0(arg2, arg3));
          } finally {
            wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
          }
        }, arguments);
      };
      imports.wbg.__wbg_log_c9486ca5d8e2cbe8 = function(arg02, arg12) {
        let deferred0_0;
        let deferred0_1;
        try {
          deferred0_0 = arg02;
          deferred0_1 = arg12;
          console.log(getStringFromWasm0(arg02, arg12));
        } finally {
          wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
        }
      };
      imports.wbg.__wbg_log_aba5996d9bde071f = function(arg02, arg12, arg2, arg3, arg4, arg5, arg6, arg7) {
        let deferred0_0;
        let deferred0_1;
        try {
          deferred0_0 = arg02;
          deferred0_1 = arg12;
          console.log(getStringFromWasm0(arg02, arg12), getStringFromWasm0(arg2, arg3), getStringFromWasm0(arg4, arg5), getStringFromWasm0(arg6, arg7));
        } finally {
          wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
        }
      };
      imports.wbg.__wbindgen_debug_string = function(arg02, arg12) {
        const ret2 = debugString(getObject(arg12));
        const ptr1 = passStringToWasm0(ret2, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg02 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg02 + 4 * 0, ptr1, true);
      };
      imports.wbg.__wbindgen_throw = function(arg02, arg12) {
        throw new Error(getStringFromWasm0(arg02, arg12));
      };
      imports.wbg.__wbg_queueMicrotask_c5419c06eab41e73 = function(arg02) {
        queueMicrotask(getObject(arg02));
      };
      imports.wbg.__wbg_queueMicrotask_848aa4969108a57e = function(arg02) {
        const ret2 = getObject(arg02).queueMicrotask;
        return addHeapObject(ret2);
      };
      imports.wbg.__wbg_instanceof_WebGl2RenderingContext_8dbe5170d8fdea28 = function(arg02) {
        let result;
        try {
          result = getObject(arg02) instanceof WebGL2RenderingContext;
        } catch (_) {
          result = false;
        }
        const ret2 = result;
        return ret2;
      };
      imports.wbg.__wbg_texImage2D_05363c5a13ee70f9 = function() {
        return handleError(function(arg02, arg12, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
          getObject(arg02).texImage2D(arg12 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, getObject(arg9));
        }, arguments);
      };
      imports.wbg.__wbg_instanceof_Window_6575cd7f1322f82f = function(arg02) {
        let result;
        try {
          result = getObject(arg02) instanceof Window;
        } catch (_) {
          result = false;
        }
        const ret2 = result;
        return ret2;
      };
      imports.wbg.__wbg_cancelIdleCallback_7e85ac94feec1b33 = function(arg02, arg12) {
        getObject(arg02).cancelIdleCallback(arg12 >>> 0);
      };
      imports.wbg.__wbg_getComputedStyle_ec7e113b79b74e98 = function() {
        return handleError(function(arg02, arg12) {
          const ret2 = getObject(arg02).getComputedStyle(getObject(arg12));
          return isLikeNone(ret2) ? 0 : addHeapObject(ret2);
        }, arguments);
      };
      imports.wbg.__wbg_matchMedia_2c5a513148e49e4a = function() {
        return handleError(function(arg02, arg12, arg2) {
          const ret2 = getObject(arg02).matchMedia(getStringFromWasm0(arg12, arg2));
          return isLikeNone(ret2) ? 0 : addHeapObject(ret2);
        }, arguments);
      };
      imports.wbg.__wbg_open_245c3e57ba96efce = function() {
        return handleError(function(arg02, arg12, arg2, arg3, arg4) {
          const ret2 = getObject(arg02).open(getStringFromWasm0(arg12, arg2), getStringFromWasm0(arg3, arg4));
          return isLikeNone(ret2) ? 0 : addHeapObject(ret2);
        }, arguments);
      };
      imports.wbg.__wbg_requestIdleCallback_effe682e9df1695f = function() {
        return handleError(function(arg02, arg12) {
          const ret2 = getObject(arg02).requestIdleCallback(getObject(arg12));
          return ret2;
        }, arguments);
      };
      imports.wbg.__wbg_cancelAnimationFrame_f802bc3f3a9b2e5c = function() {
        return handleError(function(arg02, arg12) {
          getObject(arg02).cancelAnimationFrame(arg12);
        }, arguments);
      };
      imports.wbg.__wbg_requestAnimationFrame_8c3436f4ac89bc48 = function() {
        return handleError(function(arg02, arg12) {
          const ret2 = getObject(arg02).requestAnimationFrame(getObject(arg12));
          return ret2;
        }, arguments);
      };
      imports.wbg.__wbg_clearTimeout_8567b0ecb6ec5d60 = function(arg02, arg12) {
        getObject(arg02).clearTimeout(arg12);
      };
      imports.wbg.__wbg_setTimeout_c9db6bce0a6bb71c = function() {
        return handleError(function(arg02, arg12) {
          const ret2 = getObject(arg02).setTimeout(getObject(arg12));
          return ret2;
        }, arguments);
      };
      imports.wbg.__wbg_body_8e909b791b1745d3 = function(arg02) {
        const ret2 = getObject(arg02).body;
        return isLikeNone(ret2) ? 0 : addHeapObject(ret2);
      };
      imports.wbg.__wbg_visibilityState_5e9ade0fb5df3c9c = function(arg02) {
        const ret2 = getObject(arg02).visibilityState;
        return (__wbindgen_enum_VisibilityState.indexOf(ret2) + 1 || 3) - 1;
      };
      imports.wbg.__wbg_activeElement_4ab2bc6dcf8da330 = function(arg02) {
        const ret2 = getObject(arg02).activeElement;
        return isLikeNone(ret2) ? 0 : addHeapObject(ret2);
      };
      imports.wbg.__wbg_fullscreenElement_d39685ee9d78d455 = function(arg02) {
        const ret2 = getObject(arg02).fullscreenElement;
        return isLikeNone(ret2) ? 0 : addHeapObject(ret2);
      };
      imports.wbg.__wbg_createElement_e4523490bd0ae51d = function() {
        return handleError(function(arg02, arg12, arg2) {
          const ret2 = getObject(arg02).createElement(getStringFromWasm0(arg12, arg2));
          return addHeapObject(ret2);
        }, arguments);
      };
      imports.wbg.__wbg_exitFullscreen_9eef33d4b314e087 = function(arg02) {
        getObject(arg02).exitFullscreen();
      };
      imports.wbg.__wbg_texImage2D_12005a1c57d665bb = function() {
        return handleError(function(arg02, arg12, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
          getObject(arg02).texImage2D(arg12 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, getObject(arg9));
        }, arguments);
      };
      imports.wbg.__wbg_getBoundingClientRect_5ad16be1e2955e83 = function(arg02) {
        const ret2 = getObject(arg02).getBoundingClientRect();
        return addHeapObject(ret2);
      };
      imports.wbg.__wbg_setAttribute_2a8f647a8d92c712 = function() {
        return handleError(function(arg02, arg12, arg2, arg3, arg4) {
          getObject(arg02).setAttribute(getStringFromWasm0(arg12, arg2), getStringFromWasm0(arg3, arg4));
        }, arguments);
      };
      imports.wbg.__wbg_setPointerCapture_739b13a4c8b0c2b0 = function() {
        return handleError(function(arg02, arg12) {
          getObject(arg02).setPointerCapture(arg12);
        }, arguments);
      };
      imports.wbg.__wbg_setbox_0540f4f0ed4733b6 = function(arg02, arg12) {
        getObject(arg02).box = __wbindgen_enum_ResizeObserverBoxOptions[arg12];
      };
      imports.wbg.__wbg_new_4422dda84db10905 = function() {
        return handleError(function(arg02) {
          const ret2 = new IntersectionObserver(getObject(arg02));
          return addHeapObject(ret2);
        }, arguments);
      };
      imports.wbg.__wbg_disconnect_8d41ebc92b193580 = function(arg02) {
        getObject(arg02).disconnect();
      };
      imports.wbg.__wbg_observe_6f2910a25347a592 = function(arg02, arg12) {
        getObject(arg02).observe(getObject(arg12));
      };
      imports.wbg.__wbg_setonmessage_81b2f44fc2b4b0a4 = function(arg02, arg12) {
        getObject(arg02).onmessage = getObject(arg12);
      };
      imports.wbg.__wbg_close_8356c7a6c6893135 = function(arg02) {
        getObject(arg02).close();
      };
      imports.wbg.__wbg_postMessage_5109299871335137 = function() {
        return handleError(function(arg02, arg12) {
          getObject(arg02).postMessage(getObject(arg12));
        }, arguments);
      };
      imports.wbg.__wbg_start_818baa7ac87fe59f = function(arg02) {
        getObject(arg02).start();
      };
      imports.wbg.__wbg_appendChild_bc4a0deae90a5164 = function() {
        return handleError(function(arg02, arg12) {
          const ret2 = getObject(arg02).appendChild(getObject(arg12));
          return addHeapObject(ret2);
        }, arguments);
      };
      imports.wbg.__wbg_contains_a28a8f7c01e4c130 = function(arg02, arg12) {
        const ret2 = getObject(arg02).contains(getObject(arg12));
        return ret2;
      };
      imports.wbg.__wbg_contentRect_0ff902e25b5b4c7a = function(arg02) {
        const ret2 = getObject(arg02).contentRect;
        return addHeapObject(ret2);
      };
      imports.wbg.__wbg_devicePixelContentBoxSize_67d2874a12290f0b = function(arg02) {
        const ret2 = getObject(arg02).devicePixelContentBoxSize;
        return addHeapObject(ret2);
      };
      imports.wbg.__wbg_error_e297661c1014a1cc = function(arg02, arg12) {
        console.error(getObject(arg02), getObject(arg12));
      };
      imports.wbg.__wbg_width_655495d54a5383b4 = function(arg02) {
        const ret2 = getObject(arg02).width;
        return ret2;
      };
      imports.wbg.__wbg_height_ad9c075afdac4ed7 = function(arg02) {
        const ret2 = getObject(arg02).height;
        return ret2;
      };
      imports.wbg.__wbg_isIntersecting_57d03835f2fb0c18 = function(arg02) {
        const ret2 = getObject(arg02).isIntersecting;
        return ret2;
      };
      imports.wbg.__wbg_width_3222ca0e491047f8 = function(arg02) {
        const ret2 = getObject(arg02).width;
        return ret2;
      };
      imports.wbg.__wbg_setwidth_e02ce7ae3e45c1b6 = function(arg02, arg12) {
        getObject(arg02).width = arg12 >>> 0;
      };
      imports.wbg.__wbg_height_ad067168e1893e7e = function(arg02) {
        const ret2 = getObject(arg02).height;
        return ret2;
      };
      imports.wbg.__wbg_setheight_45e518143d1ca78f = function(arg02, arg12) {
        getObject(arg02).height = arg12 >>> 0;
      };
      imports.wbg.__wbg_getContext_3661e96619dc6e6c = function() {
        return handleError(function(arg02, arg12, arg2, arg3) {
          const ret2 = getObject(arg02).getContext(getStringFromWasm0(arg12, arg2), getObject(arg3));
          return isLikeNone(ret2) ? 0 : addHeapObject(ret2);
        }, arguments);
      };
      imports.wbg.__wbg_newwithstrsequenceandoptions_3d581ce16ca52c44 = function() {
        return handleError(function(arg02, arg12) {
          const ret2 = new Blob(getObject(arg02), getObject(arg12));
          return addHeapObject(ret2);
        }, arguments);
      };
      imports.wbg.__wbg_x_a9a34a1bc15c8dea = function(arg02) {
        const ret2 = getObject(arg02).x;
        return ret2;
      };
      imports.wbg.__wbg_y_4926ebe58a2a92c8 = function(arg02) {
        const ret2 = getObject(arg02).y;
        return ret2;
      };
      imports.wbg.__wbg_videoWidth_2cca108f1f2055da = function(arg02) {
        const ret2 = getObject(arg02).videoWidth;
        return ret2;
      };
      imports.wbg.__wbg_videoHeight_d80fda4a200a84da = function(arg02) {
        const ret2 = getObject(arg02).videoHeight;
        return ret2;
      };
      imports.wbg.__wbg_new_bc395d17a25f9f2f = function() {
        return handleError(function(arg02) {
          const ret2 = new ResizeObserver(getObject(arg02));
          return addHeapObject(ret2);
        }, arguments);
      };
      imports.wbg.__wbg_disconnect_91f6e3e629264c78 = function(arg02) {
        getObject(arg02).disconnect();
      };
      imports.wbg.__wbg_observe_51c387de0413edcf = function(arg02, arg12) {
        getObject(arg02).observe(getObject(arg12));
      };
      imports.wbg.__wbg_observe_e05a589c42476328 = function(arg02, arg12, arg2) {
        getObject(arg02).observe(getObject(arg12), getObject(arg2));
      };
      imports.wbg.__wbg_unobserve_79fd6473e7891735 = function(arg02, arg12) {
        getObject(arg02).unobserve(getObject(arg12));
      };
      imports.wbg.__wbg_createObjectURL_11804d71ac214694 = function() {
        return handleError(function(arg02, arg12) {
          const ret2 = URL.createObjectURL(getObject(arg12));
          const ptr1 = passStringToWasm0(ret2, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
          const len1 = WASM_VECTOR_LEN;
          getDataViewMemory0().setInt32(arg02 + 4 * 1, len1, true);
          getDataViewMemory0().setInt32(arg02 + 4 * 0, ptr1, true);
        }, arguments);
      };
      imports.wbg.__wbg_revokeObjectURL_8e72bad4541bdca0 = function() {
        return handleError(function(arg02, arg12) {
          URL.revokeObjectURL(getStringFromWasm0(arg02, arg12));
        }, arguments);
      };
      imports.wbg.__wbg_settype_623d2ee701e6310a = function(arg02, arg12, arg2) {
        getObject(arg02).type = getStringFromWasm0(arg12, arg2);
      };
      imports.wbg.__wbg_signal_9acfcec9e7dffc22 = function(arg02) {
        const ret2 = getObject(arg02).signal;
        return addHeapObject(ret2);
      };
      imports.wbg.__wbg_new_75169ae5a9683c55 = function() {
        return handleError(function() {
          const ret2 = new AbortController();
          return addHeapObject(ret2);
        }, arguments);
      };
      imports.wbg.__wbg_abort_c57daab47a6c1215 = function(arg02) {
        getObject(arg02).abort();
      };
      imports.wbg.__wbg_getPropertyValue_b199c95cfeadebdf = function() {
        return handleError(function(arg02, arg12, arg2, arg3) {
          const ret2 = getObject(arg12).getPropertyValue(getStringFromWasm0(arg2, arg3));
          const ptr1 = passStringToWasm0(ret2, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
          const len1 = WASM_VECTOR_LEN;
          getDataViewMemory0().setInt32(arg02 + 4 * 1, len1, true);
          getDataViewMemory0().setInt32(arg02 + 4 * 0, ptr1, true);
        }, arguments);
      };
      imports.wbg.__wbg_removeProperty_5acbca68235d0706 = function() {
        return handleError(function(arg02, arg12, arg2, arg3) {
          const ret2 = getObject(arg12).removeProperty(getStringFromWasm0(arg2, arg3));
          const ptr1 = passStringToWasm0(ret2, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
          const len1 = WASM_VECTOR_LEN;
          getDataViewMemory0().setInt32(arg02 + 4 * 1, len1, true);
          getDataViewMemory0().setInt32(arg02 + 4 * 0, ptr1, true);
        }, arguments);
      };
      imports.wbg.__wbg_inlineSize_bdd9c1683673d79e = function(arg02) {
        const ret2 = getObject(arg02).inlineSize;
        return ret2;
      };
      imports.wbg.__wbg_blockSize_5d28da4852a3728e = function(arg02) {
        const ret2 = getObject(arg02).blockSize;
        return ret2;
      };
      imports.wbg.__wbg_width_45de62653cf1c40c = function(arg02) {
        const ret2 = getObject(arg02).width;
        return ret2;
      };
      imports.wbg.__wbg_height_333816c9b207333d = function(arg02) {
        const ret2 = getObject(arg02).height;
        return ret2;
      };
      imports.wbg.__wbg_width_cd62a064492c4489 = function(arg02) {
        const ret2 = getObject(arg02).width;
        return ret2;
      };
      imports.wbg.__wbg_setwidth_23bf2deedd907275 = function(arg02, arg12) {
        getObject(arg02).width = arg12 >>> 0;
      };
      imports.wbg.__wbg_height_f9f3ea69baf38ed4 = function(arg02) {
        const ret2 = getObject(arg02).height;
        return ret2;
      };
      imports.wbg.__wbg_setheight_239dc283bbe50da4 = function(arg02, arg12) {
        getObject(arg02).height = arg12 >>> 0;
      };
      imports.wbg.__wbg_getContext_cfe4caa91ffe938e = function() {
        return handleError(function(arg02, arg12, arg2, arg3) {
          const ret2 = getObject(arg02).getContext(getStringFromWasm0(arg12, arg2), getObject(arg3));
          return isLikeNone(ret2) ? 0 : addHeapObject(ret2);
        }, arguments);
      };
      imports.wbg.__wbg_media_80aa0a213cbd9b0b = function(arg02, arg12) {
        const ret2 = getObject(arg12).media;
        const ptr1 = passStringToWasm0(ret2, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg02 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg02 + 4 * 0, ptr1, true);
      };
      imports.wbg.__wbg_matches_7df350fbe7beb09f = function(arg02) {
        const ret2 = getObject(arg02).matches;
        return ret2;
      };
      imports.wbg.__wbg_addListener_503d439bc3f84ff3 = function() {
        return handleError(function(arg02, arg12) {
          getObject(arg02).addListener(getObject(arg12));
        }, arguments);
      };
      imports.wbg.__wbg_removeListener_0e5684bf9a4fe773 = function() {
        return handleError(function(arg02, arg12) {
          getObject(arg02).removeListener(getObject(arg12));
        }, arguments);
      };
      imports.wbg.__wbg_new_00d033f8a8736a28 = function() {
        return handleError(function(arg02, arg12) {
          const ret2 = new Worker(getStringFromWasm0(arg02, arg12));
          return addHeapObject(ret2);
        }, arguments);
      };
      imports.wbg.__wbg_postMessage_857ce8a4ab57c841 = function() {
        return handleError(function(arg02, arg12, arg2) {
          getObject(arg02).postMessage(getObject(arg12), getObject(arg2));
        }, arguments);
      };
      imports.wbg.__wbg_altKey_ebf03e2308f51c08 = function(arg02) {
        const ret2 = getObject(arg02).altKey;
        return ret2;
      };
      imports.wbg.__wbg_ctrlKey_f592192d87040d94 = function(arg02) {
        const ret2 = getObject(arg02).ctrlKey;
        return ret2;
      };
      imports.wbg.__wbg_shiftKey_cb120edc9c25950d = function(arg02) {
        const ret2 = getObject(arg02).shiftKey;
        return ret2;
      };
      imports.wbg.__wbg_metaKey_0735ca81e2ec6c72 = function(arg02) {
        const ret2 = getObject(arg02).metaKey;
        return ret2;
      };
      imports.wbg.__wbg_location_a7e2614c5720fcd7 = function(arg02) {
        const ret2 = getObject(arg02).location;
        return ret2;
      };
      imports.wbg.__wbg_repeat_1f81f308f5d8d519 = function(arg02) {
        const ret2 = getObject(arg02).repeat;
        return ret2;
      };
      imports.wbg.__wbg_key_001eb20ba3b3d2fd = function(arg02, arg12) {
        const ret2 = getObject(arg12).key;
        const ptr1 = passStringToWasm0(ret2, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg02 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg02 + 4 * 0, ptr1, true);
      };
      imports.wbg.__wbg_code_bec0d5222298000e = function(arg02, arg12) {
        const ret2 = getObject(arg12).code;
        const ptr1 = passStringToWasm0(ret2, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg02 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg02 + 4 * 0, ptr1, true);
      };
      imports.wbg.__wbg_port1_a6e649ef4f3886f3 = function(arg02) {
        const ret2 = getObject(arg02).port1;
        return addHeapObject(ret2);
      };
      imports.wbg.__wbg_port2_6fdacea6fa8e446e = function(arg02) {
        const ret2 = getObject(arg02).port2;
        return addHeapObject(ret2);
      };
      imports.wbg.__wbg_new_e207405ddca58ee2 = function() {
        return handleError(function() {
          const ret2 = new MessageChannel();
          return addHeapObject(ret2);
        }, arguments);
      };
      imports.wbg.__wbg_persisted_af13b0ad7952721a = function(arg02) {
        const ret2 = getObject(arg02).persisted;
        return ret2;
      };
      imports.wbg.__wbg_pointerId_93f7e5e10bb641ad = function(arg02) {
        const ret2 = getObject(arg02).pointerId;
        return ret2;
      };
      imports.wbg.__wbg_pressure_ad8dacbd14c9076f = function(arg02) {
        const ret2 = getObject(arg02).pressure;
        return ret2;
      };
      imports.wbg.__wbg_pointerType_6d91ef0da43639d3 = function(arg02, arg12) {
        const ret2 = getObject(arg12).pointerType;
        const ptr1 = passStringToWasm0(ret2, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg02 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg02 + 4 * 0, ptr1, true);
      };
      imports.wbg.__wbg_getCoalescedEvents_8f8920b382098ac5 = function(arg02) {
        const ret2 = getObject(arg02).getCoalescedEvents();
        return addHeapObject(ret2);
      };
      imports.wbg.__wbg_deltaX_10154f810008c0a0 = function(arg02) {
        const ret2 = getObject(arg02).deltaX;
        return ret2;
      };
      imports.wbg.__wbg_deltaY_afd77a1b9e0d9ccd = function(arg02) {
        const ret2 = getObject(arg02).deltaY;
        return ret2;
      };
      imports.wbg.__wbg_deltaMode_f31810d86a9defec = function(arg02) {
        const ret2 = getObject(arg02).deltaMode;
        return ret2;
      };
      imports.wbg.__wbg_preventDefault_eecc4a63e64c4526 = function(arg02) {
        getObject(arg02).preventDefault();
      };
      imports.wbg.__wbg_removeEventListener_4c13d11156153514 = function() {
        return handleError(function(arg02, arg12, arg2, arg3) {
          getObject(arg02).removeEventListener(getStringFromWasm0(arg12, arg2), getObject(arg3));
        }, arguments);
      };
      imports.wbg.__wbg_ctrlKey_4015247a39aa9410 = function(arg02) {
        const ret2 = getObject(arg02).ctrlKey;
        return ret2;
      };
      imports.wbg.__wbg_shiftKey_6d843f3032fd0366 = function(arg02) {
        const ret2 = getObject(arg02).shiftKey;
        return ret2;
      };
      imports.wbg.__wbg_altKey_c9401b041949ea90 = function(arg02) {
        const ret2 = getObject(arg02).altKey;
        return ret2;
      };
      imports.wbg.__wbg_metaKey_5d680933661ea1ea = function(arg02) {
        const ret2 = getObject(arg02).metaKey;
        return ret2;
      };
      imports.wbg.__wbg_button_d8226b772c8cf494 = function(arg02) {
        const ret2 = getObject(arg02).button;
        return ret2;
      };
      imports.wbg.__wbg_buttons_2cb9e49b40e20105 = function(arg02) {
        const ret2 = getObject(arg02).buttons;
        return ret2;
      };
      imports.wbg.__wbg_movementX_468fdc7a7281744b = function(arg02) {
        const ret2 = getObject(arg02).movementX;
        return ret2;
      };
      imports.wbg.__wbg_movementY_8bbbf8c3bffd1fce = function(arg02) {
        const ret2 = getObject(arg02).movementY;
        return ret2;
      };
      imports.wbg.__wbg_performance_a1b8bde2ee512264 = function(arg02) {
        const ret2 = getObject(arg02).performance;
        return addHeapObject(ret2);
      };
      imports.wbg.__wbg_now_abd80e969af37148 = function(arg02) {
        const ret2 = getObject(arg02).now();
        return ret2;
      };
      imports.wbg.__wbg_queueMicrotask_693514e3dcae83e6 = function(arg02) {
        queueMicrotask(takeObject(arg02));
      };
      imports.wbg.__wbg_offsetX_294898d040917c6b = function(arg02) {
        const ret2 = getObject(arg02).offsetX;
        return ret2;
      };
      imports.wbg.__wbg_offsetY_f484804b7b03dd86 = function(arg02) {
        const ret2 = getObject(arg02).offsetY;
        return ret2;
      };
      imports.wbg.__wbg_prototype_d33365945f23f380 = function() {
        const ret2 = ResizeObserverEntry.prototype;
        return addHeapObject(ret2);
      };
      imports.wbg.__wbg_Window_bd9ec3fee5f673ee = function(arg02) {
        const ret2 = getObject(arg02).Window;
        return addHeapObject(ret2);
      };
      imports.wbg.__wbg_getCoalescedEvents_85701851c470c4e6 = function(arg02) {
        const ret2 = getObject(arg02).getCoalescedEvents;
        return addHeapObject(ret2);
      };
      imports.wbg.__wbg_scheduler_7ccf2d3b362018c4 = function(arg02) {
        const ret2 = getObject(arg02).scheduler;
        return addHeapObject(ret2);
      };
      imports.wbg.__wbg_scheduler_f38a681d98b5a776 = function(arg02) {
        const ret2 = getObject(arg02).scheduler;
        return addHeapObject(ret2);
      };
      imports.wbg.__wbg_requestIdleCallback_86b728660e0547ef = function(arg02) {
        const ret2 = getObject(arg02).requestIdleCallback;
        return addHeapObject(ret2);
      };
      imports.wbg.__wbg_postTask_99464245f349be5a = function(arg02, arg12, arg2) {
        const ret2 = getObject(arg02).postTask(getObject(arg12), getObject(arg2));
        return addHeapObject(ret2);
      };
      imports.wbg.__wbg_brand_cdcf0249d44027a8 = function(arg02, arg12) {
        const ret2 = getObject(arg12).brand;
        const ptr1 = passStringToWasm0(ret2, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg02 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg02 + 4 * 0, ptr1, true);
      };
      imports.wbg.__wbg_userAgentData_85a8393570ab7dee = function(arg02) {
        const ret2 = getObject(arg02).userAgentData;
        return isLikeNone(ret2) ? 0 : addHeapObject(ret2);
      };
      imports.wbg.__wbg_brands_982de08b35281a98 = function(arg02) {
        const ret2 = getObject(arg02).brands;
        return addHeapObject(ret2);
      };
      imports.wbg.__wbg_requestFullscreen_24891df6120b675d = function(arg02) {
        const ret2 = getObject(arg02).requestFullscreen();
        return addHeapObject(ret2);
      };
      imports.wbg.__wbg_cancel_cba86749f45f30ae = function(arg02) {
        getObject(arg02).cancel();
      };
      imports.wbg.__wbg_animate_b321da85ed3f2b4a = function(arg02, arg12, arg2) {
        const ret2 = getObject(arg02).animate(getObject(arg12), getObject(arg2));
        return addHeapObject(ret2);
      };
      imports.wbg.__wbg_play_5896e5851ba90aa2 = function(arg02) {
        getObject(arg02).play();
      };
      imports.wbg.__wbg_requestFullscreen_8a94df4e7f757077 = function(arg02) {
        const ret2 = getObject(arg02).requestFullscreen;
        return addHeapObject(ret2);
      };
      imports.wbg.__wbg_webkitRequestFullscreen_42ba1c34171febc6 = function(arg02) {
        getObject(arg02).webkitRequestFullscreen();
      };
      imports.wbg.__wbg_webkitFullscreenElement_a02341d57a641b43 = function(arg02) {
        const ret2 = getObject(arg02).webkitFullscreenElement;
        return isLikeNone(ret2) ? 0 : addHeapObject(ret2);
      };
      imports.wbg.__wbg_webkitExitFullscreen_77a6c8d07ec6ee46 = function(arg02) {
        getObject(arg02).webkitExitFullscreen();
      };
      imports.wbg.__wbindgen_closure_wrapper25243 = function(arg02, arg12, arg2) {
        const ret2 = makeMutClosure(arg02, arg12, 17244, __wbg_adapter_34);
        return addHeapObject(ret2);
      };
      imports.wbg.__wbindgen_closure_wrapper121351 = function(arg02, arg12, arg2) {
        const ret2 = makeMutClosure(arg02, arg12, 82477, __wbg_adapter_37);
        return addHeapObject(ret2);
      };
      imports.wbg.__wbindgen_closure_wrapper124700 = function(arg02, arg12, arg2) {
        const ret2 = makeMutClosure(arg02, arg12, 83773, __wbg_adapter_40);
        return addHeapObject(ret2);
      };
      imports.wbg.__wbindgen_closure_wrapper129489 = function(arg02, arg12, arg2) {
        const ret2 = makeMutClosure(arg02, arg12, 84941, __wbg_adapter_43);
        return addHeapObject(ret2);
      };
      imports.wbg.__wbindgen_closure_wrapper129491 = function(arg02, arg12, arg2) {
        const ret2 = makeMutClosure(arg02, arg12, 84941, __wbg_adapter_46);
        return addHeapObject(ret2);
      };
      imports.wbg.__wbindgen_closure_wrapper129493 = function(arg02, arg12, arg2) {
        const ret2 = makeMutClosure(arg02, arg12, 84941, __wbg_adapter_43);
        return addHeapObject(ret2);
      };
      imports.wbg.__wbindgen_closure_wrapper129498 = function(arg02, arg12, arg2) {
        const ret2 = makeMutClosure(arg02, arg12, 84941, __wbg_adapter_51);
        return addHeapObject(ret2);
      };
      imports.wbg.__wbindgen_closure_wrapper129503 = function(arg02, arg12, arg2) {
        const ret2 = makeMutClosure(arg02, arg12, 84941, __wbg_adapter_43);
        return addHeapObject(ret2);
      };
      imports.wbg.__wbindgen_closure_wrapper129506 = function(arg02, arg12, arg2) {
        const ret2 = makeMutClosure(arg02, arg12, 84941, __wbg_adapter_43);
        return addHeapObject(ret2);
      };
      imports.wbg.__wbindgen_closure_wrapper129510 = function(arg02, arg12, arg2) {
        const ret2 = makeMutClosure(arg02, arg12, 84941, __wbg_adapter_43);
        return addHeapObject(ret2);
      };
      imports.wbg.__wbindgen_closure_wrapper129512 = function(arg02, arg12, arg2) {
        const ret2 = makeMutClosure(arg02, arg12, 84941, __wbg_adapter_43);
        return addHeapObject(ret2);
      };
      imports.wbg.__wbindgen_closure_wrapper129519 = function(arg02, arg12, arg2) {
        const ret2 = makeMutClosure(arg02, arg12, 84941, __wbg_adapter_43);
        return addHeapObject(ret2);
      };
      return imports;
    }
    function __wbg_finalize_init(instance, module2) {
      wasm = instance.exports;
      __wbg_init.__wbindgen_wasm_module = module2;
      cachedDataViewMemory0 = null;
      cachedFloat32ArrayMemory0 = null;
      cachedInt32ArrayMemory0 = null;
      cachedUint32ArrayMemory0 = null;
      cachedUint8ArrayMemory0 = null;
      wasm.__wbindgen_start();
      return wasm;
    }
    async function __wbg_init(module_or_path) {
      if (wasm !== void 0)
        return wasm;
      if (typeof module_or_path !== "undefined") {
        if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
          ({ module_or_path } = module_or_path);
        } else {
          console.warn("using deprecated parameters for the initialization function; pass a single object instead");
        }
      }
      if (typeof module_or_path === "undefined") {
        module_or_path = new URL("/out/embodx_bg.wasm", self.location);
      }
      const imports2 = __wbg_get_imports();
      if (typeof module_or_path === "string" || typeof Request === "function" && module_or_path instanceof Request || typeof URL === "function" && module_or_path instanceof URL) {
        module_or_path = fetch(module_or_path);
      }
      const { instance, module: module2 } = await __wbg_load(await module_or_path, imports2);
      return __wbg_finalize_init(instance, module2);
    }
    if (typeof QRCode === "undefined") {
      throw new Error(
        "Missing `QRCode` function, please include `qrcode.min.js` as script tags before from https://unpkg.com/qrcodejs@1.0.0/qrcode.min.js"
      );
    }
    class QRCodeDisplay extends HTMLElement {
      constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        const style2 = document.createElement("style");
        const run = document.createElement("div");
        run.className = "run";
        const build = document.createElement("div");
        build.className = "build";
        style2.textContent = `
.build {
  display: none;
}
    `;
        shadow.appendChild(style2);
        shadow.appendChild(run);
        shadow.appendChild(build);
        this.render();
      }
      static get observedAttributes() {
        return ["data", "width", "height", "wrap-anchor"];
      }
      attributeChangedCallback(attrName, oldVal, newVal) {
        if (oldVal !== newVal) {
          this.render();
        }
      }
      render() {
        const data = this.getAttribute("data");
        let wrapAnchor = false;
        try {
          wrapAnchor = JSON.parse(this.getAttribute("wrap-anchor"));
        } catch (e) {
          console.warn(
            "Wrong `wrap-anchor` attribute passed to `qrcode-display` (only accepts `true` or `false`)"
          );
          wrapAnchor = false;
        }
        if (data) {
          this.shadowRoot.querySelector(".build").innerHTML = "";
          new QRCode(this.shadowRoot.querySelector(".build"), {
            text: this.getAttribute("data"),
            width: parseInt(this.getAttribute("width")) || 200,
            height: parseInt(this.getAttribute("height")) || 200,
            colorDark: "#900000"
          });
          const img = this.shadowRoot.querySelector(".build img");
          setTimeout(() => {
            img.style.display = "initial";
          }, 0);
          img.title = data;
          this.shadowRoot.querySelector(".run").innerHTML = "";
          if (wrapAnchor) {
            const a = document.createElement("a");
            a.href = data;
            a.title = data;
            a.appendChild(img);
            this.shadowRoot.querySelector(".run").appendChild(a);
          } else {
            this.shadowRoot.querySelector(".run").appendChild(img);
          }
        }
      }
    }
    customElements.define("qrcode-display", QRCodeDisplay);
    const defaultAttributes = {
      size: "l",
      lang: "en",
      dnt: false,
      buttonTitle: "Twitter Tweet Button",
      text: null,
      url: null,
      hashtags: null,
      via: null,
      related: null,
      className: null,
      style: null
    };
    class TwitterButton extends HTMLElement {
      constructor() {
        super();
        this.initDefaultValues();
        const template = document.createElement("template");
        template.innerHTML = `
<style>
  :host {
    display: inline-block;
  }
</style>
<iframe allowtransparency="true" frameborder="0" scrolling="no" width="82px" height="28px"></iframe>
    `;
        const shadow = this.attachShadow({ mode: "open" });
        shadow.appendChild(template.content.cloneNode(true));
        this.render();
      }
      initDefaultValues() {
        Object.entries(defaultAttributes).forEach(
          ([attributeName, defaultValue]) => {
            this[attributeName] = this[attributeName] || defaultValue;
          }
        );
      }
      static get observedAttributes() {
        return Object.keys(defaultAttributes);
      }
      attributeChangedCallback(attrName, oldVal, newVal) {
        if (oldVal !== newVal) {
          this.render();
        }
      }
      render() {
        const params = [
          `size=${this.size}`,
          "count=none",
          `dnt=${this.dnt}`,
          `lang=${this.lang}`,
          this.text != null && `text=${encodeURIComponent(this.text)}`,
          this.url != null && `url=${encodeURIComponent(this.url)}`,
          this.hashtags != null && `hashtags=${encodeURIComponent(this.hashtags)}`,
          this.via != null && `via=${encodeURIComponent(this.via)}`,
          this.related != null && `related=${encodeURIComponent(this.related)}`
        ].filter(Boolean).join("&");
        const iframe = this.shadowRoot.querySelector("iframe");
        iframe.src = `https://platform.twitter.com/widgets/tweet_button.html?${params}`;
        iframe.title = this.buttonTitle;
      }
    }
    Object.keys(defaultAttributes).forEach((attributeName) => {
      Object.defineProperty(TwitterButton.prototype, attributeName, {
        get() {
          return this.getAttribute(attributeName);
        },
        set(value) {
          if (typeof value === "undefined" || value === null) {
            this.removeAttribute(attributeName);
          } else {
            this.setAttribute(attributeName, value);
          }
        }
      });
    });
    customElements.define("twitter-button", TwitterButton);
    class FooterDisplay extends HTMLElement {
      constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        const style2 = document.createElement("style");
        const footer = document.createElement("footer");
        style2.textContent = `
footer {
  text-align: center;
  font-size: 85%;
  opacity: 0.8;
}
p {
  line-height: 1.5rem;
}
a {
  color: #900000;
}
    `;
        shadow.appendChild(style2);
        shadow.appendChild(footer);
        this.render();
      }
      static get observedAttributes() {
        return ["from", "to"];
      }
      attributeChangedCallback(attrName, oldVal, newVal) {
        if (oldVal !== newVal) {
          this.render();
        }
      }
      render() {
        const from = Number(this.getAttribute("from")) || 2024;
        const to = Number(this.getAttribute("to")) || 2024;
        const fromTo = from === to ? from : `${from}-${to}`;
        this.shadowRoot.querySelector("footer").innerHTML = `
<p>
    \xA9${fromTo} - <a href="http://cs.tinyiu.com/">cs.tinyiu.com</a> - @soraxas
</p>
<p>
    <twitter-button text="\u{1F916} A cutting-edge robotics project focused on embodied AI, combining real-to-sim technology for enhanced simulation and real-world integration. " url="https://embodx.ai" via="soraxas"></twitter-button>
</p>
    `;
      }
    }
    customElements.define("footer-display", FooterDisplay);
    const qrcodeDisplay = document.querySelector("qrcode-display");
    qrcodeDisplay.setAttribute("data", window.location.href);
    document.getElementById("start").addEventListener("click", () => {
      console.log("start");
      document.body.classList.add("playing");
      __wbg_init();
    });
    document.querySelector(".back-home-page").addEventListener("click", () => {
      console.log("stop");
      window.location.reload();
    });
  }
});
export default require_index_ae0ee7ca();
