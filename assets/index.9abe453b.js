var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var require_index_9abe453b = __commonJS({
  "assets/index.9abe453b.js"(exports, module) {
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
    function isLikeNone(x) {
      return x === void 0 || x === null;
    }
    function addToExternrefTable0(obj) {
      const idx = wasm.__externref_table_alloc();
      wasm.__wbindgen_export_1.set(idx, obj);
      return idx;
    }
    const cachedTextDecoder = typeof TextDecoder !== "undefined" ? new TextDecoder("utf-8", { ignoreBOM: true, fatal: true }) : { decode: () => {
      throw Error("TextDecoder not available");
    } };
    if (typeof TextDecoder !== "undefined") {
      cachedTextDecoder.decode();
    }
    let cachedUint8ArrayMemory0 = null;
    function getUint8ArrayMemory0() {
      if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
      }
      return cachedUint8ArrayMemory0;
    }
    function getStringFromWasm0(ptr, len) {
      ptr = ptr >>> 0;
      return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
    }
    function handleError(f, args) {
      try {
        return f.apply(this, args);
      } catch (e) {
        const idx = addToExternrefTable0(e);
        wasm.__wbindgen_exn_store(idx);
      }
    }
    let WASM_VECTOR_LEN = 0;
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
    let cachedDataViewMemory0 = null;
    function getDataViewMemory0() {
      if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || cachedDataViewMemory0.buffer.detached === void 0 && cachedDataViewMemory0.buffer !== wasm.memory.buffer) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
      }
      return cachedDataViewMemory0;
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
    const CLOSURE_DTORS = typeof FinalizationRegistry === "undefined" ? { register: () => {
    }, unregister: () => {
    } } : new FinalizationRegistry((state) => {
      wasm.__wbindgen_export_6.get(state.dtor)(state.a, state.b);
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
            wasm.__wbindgen_export_6.get(state.dtor)(a, state.b);
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
      if (builtInMatches && builtInMatches.length > 1) {
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
    function send_device_state_to_bevy(x, y, z, qx, qy, qz, qw) {
      wasm.send_device_state_to_bevy(x, y, z, qx, qy, qz, qw);
    }
    function send_device_control_toggle_to_bevy(control_position, control_orientation) {
      wasm.send_device_control_toggle_to_bevy(control_position, control_orientation);
    }
    function __wbg_adapter_36(arg02, arg12, arg2) {
      wasm.closure16234_externref_shim(arg02, arg12, arg2);
    }
    function __wbg_adapter_39(arg02, arg12) {
      wasm._dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h092334bf9f59f039(arg02, arg12);
    }
    function __wbg_adapter_42(arg02, arg12, arg2) {
      wasm.closure79370_externref_shim(arg02, arg12, arg2);
    }
    function __wbg_adapter_45(arg02, arg12, arg2) {
      wasm.closure80553_externref_shim(arg02, arg12, arg2);
    }
    function __wbg_adapter_54(arg02, arg12) {
      wasm._dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h7eaf48ab7dd75fd8(arg02, arg12);
    }
    function __wbg_adapter_63(arg02, arg12, arg2, arg3) {
      wasm.closure80554_externref_shim(arg02, arg12, arg2, arg3);
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
      imports.wbg.__wbg_Window_96e58b3552ce6bb1 = function(arg02) {
        const ret2 = arg02.Window;
        return ret2;
      };
      imports.wbg.__wbg_Window_f4849ee751d39d85 = function(arg02) {
        const ret2 = arg02.Window;
        return ret2;
      };
      imports.wbg.__wbg_WorkerGlobalScope_0f54bb2c92552bbd = function(arg02) {
        const ret2 = arg02.WorkerGlobalScope;
        return ret2;
      };
      imports.wbg.__wbg_abort_05026c983d86824c = function(arg02) {
        arg02.abort();
      };
      imports.wbg.__wbg_activeElement_ea31ecc5423c6046 = function(arg02) {
        const ret2 = arg02.activeElement;
        return isLikeNone(ret2) ? 0 : addToExternrefTable0(ret2);
      };
      imports.wbg.__wbg_activeTexture_446c979476d36a40 = function(arg02, arg12) {
        arg02.activeTexture(arg12 >>> 0);
      };
      imports.wbg.__wbg_activeTexture_aec8c249ceb838d2 = function(arg02, arg12) {
        arg02.activeTexture(arg12 >>> 0);
      };
      imports.wbg.__wbg_addEventListener_b9481c2c2cab6047 = function() {
        return handleError(function(arg02, arg12, arg2, arg3) {
          arg02.addEventListener(getStringFromWasm0(arg12, arg2), arg3);
        }, arguments);
      };
      imports.wbg.__wbg_addListener_16cb1f9da98d0a95 = function() {
        return handleError(function(arg02, arg12) {
          arg02.addListener(arg12);
        }, arguments);
      };
      imports.wbg.__wbg_altKey_d5409f5ddaa29593 = function(arg02) {
        const ret2 = arg02.altKey;
        return ret2;
      };
      imports.wbg.__wbg_altKey_d54599b3b6b6cf22 = function(arg02) {
        const ret2 = arg02.altKey;
        return ret2;
      };
      imports.wbg.__wbg_animate_310f1b8e5b1fdb56 = function(arg02, arg12, arg2) {
        const ret2 = arg02.animate(arg12, arg2);
        return ret2;
      };
      imports.wbg.__wbg_appendChild_d22bc7af6b96b3f1 = function() {
        return handleError(function(arg02, arg12) {
          const ret2 = arg02.appendChild(arg12);
          return ret2;
        }, arguments);
      };
      imports.wbg.__wbg_arrayBuffer_d0ca2ad8bda0039b = function() {
        return handleError(function(arg02) {
          const ret2 = arg02.arrayBuffer();
          return ret2;
        }, arguments);
      };
      imports.wbg.__wbg_attachShader_4dc5977795b5d865 = function(arg02, arg12, arg2) {
        arg02.attachShader(arg12, arg2);
      };
      imports.wbg.__wbg_attachShader_9b79a4896fee779d = function(arg02, arg12, arg2) {
        arg02.attachShader(arg12, arg2);
      };
      imports.wbg.__wbg_axes_d78d107fb9a34d3d = function(arg02) {
        const ret2 = arg02.axes;
        return ret2;
      };
      imports.wbg.__wbg_beginQuery_a36d8be48a41efd1 = function(arg02, arg12, arg2) {
        arg02.beginQuery(arg12 >>> 0, arg2);
      };
      imports.wbg.__wbg_bindAttribLocation_1bb7778a77cc9600 = function(arg02, arg12, arg2, arg3, arg4) {
        arg02.bindAttribLocation(arg12, arg2 >>> 0, getStringFromWasm0(arg3, arg4));
      };
      imports.wbg.__wbg_bindAttribLocation_c29bf37210232571 = function(arg02, arg12, arg2, arg3, arg4) {
        arg02.bindAttribLocation(arg12, arg2 >>> 0, getStringFromWasm0(arg3, arg4));
      };
      imports.wbg.__wbg_bindBufferRange_8c066df50b7f2079 = function(arg02, arg12, arg2, arg3, arg4, arg5) {
        arg02.bindBufferRange(arg12 >>> 0, arg2 >>> 0, arg3, arg4, arg5);
      };
      imports.wbg.__wbg_bindBuffer_e9412cc77f8130d6 = function(arg02, arg12, arg2) {
        arg02.bindBuffer(arg12 >>> 0, arg2);
      };
      imports.wbg.__wbg_bindBuffer_ff7c55f1062014bc = function(arg02, arg12, arg2) {
        arg02.bindBuffer(arg12 >>> 0, arg2);
      };
      imports.wbg.__wbg_bindFramebuffer_c89f5adcd05acda2 = function(arg02, arg12, arg2) {
        arg02.bindFramebuffer(arg12 >>> 0, arg2);
      };
      imports.wbg.__wbg_bindFramebuffer_fbd7ce3580c64aab = function(arg02, arg12, arg2) {
        arg02.bindFramebuffer(arg12 >>> 0, arg2);
      };
      imports.wbg.__wbg_bindRenderbuffer_99e33f6e6bbbf495 = function(arg02, arg12, arg2) {
        arg02.bindRenderbuffer(arg12 >>> 0, arg2);
      };
      imports.wbg.__wbg_bindRenderbuffer_b2ae77395abc8841 = function(arg02, arg12, arg2) {
        arg02.bindRenderbuffer(arg12 >>> 0, arg2);
      };
      imports.wbg.__wbg_bindSampler_643fcc252494b69e = function(arg02, arg12, arg2) {
        arg02.bindSampler(arg12 >>> 0, arg2);
      };
      imports.wbg.__wbg_bindTexture_8b97cf7511a725d0 = function(arg02, arg12, arg2) {
        arg02.bindTexture(arg12 >>> 0, arg2);
      };
      imports.wbg.__wbg_bindTexture_f65d2e377e3de352 = function(arg02, arg12, arg2) {
        arg02.bindTexture(arg12 >>> 0, arg2);
      };
      imports.wbg.__wbg_bindVertexArrayOES_19ed43bbe1241f7a = function(arg02, arg12) {
        arg02.bindVertexArrayOES(arg12);
      };
      imports.wbg.__wbg_bindVertexArray_67a807a1cd64976a = function(arg02, arg12) {
        arg02.bindVertexArray(arg12);
      };
      imports.wbg.__wbg_blendColor_18e368a25ef98e20 = function(arg02, arg12, arg2, arg3, arg4) {
        arg02.blendColor(arg12, arg2, arg3, arg4);
      };
      imports.wbg.__wbg_blendColor_e6dc90d8b0f2859d = function(arg02, arg12, arg2, arg3, arg4) {
        arg02.blendColor(arg12, arg2, arg3, arg4);
      };
      imports.wbg.__wbg_blendEquationSeparate_26681d98390d0057 = function(arg02, arg12, arg2) {
        arg02.blendEquationSeparate(arg12 >>> 0, arg2 >>> 0);
      };
      imports.wbg.__wbg_blendEquationSeparate_e81d45aebb0a6f22 = function(arg02, arg12, arg2) {
        arg02.blendEquationSeparate(arg12 >>> 0, arg2 >>> 0);
      };
      imports.wbg.__wbg_blendEquation_9f73e32730d0c986 = function(arg02, arg12) {
        arg02.blendEquation(arg12 >>> 0);
      };
      imports.wbg.__wbg_blendEquation_c46279e50291dd42 = function(arg02, arg12) {
        arg02.blendEquation(arg12 >>> 0);
      };
      imports.wbg.__wbg_blendFuncSeparate_0031130a17fd5eb8 = function(arg02, arg12, arg2, arg3, arg4) {
        arg02.blendFuncSeparate(arg12 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
      };
      imports.wbg.__wbg_blendFuncSeparate_4d5cc402dcf7389f = function(arg02, arg12, arg2, arg3, arg4) {
        arg02.blendFuncSeparate(arg12 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
      };
      imports.wbg.__wbg_blendFunc_3fa0c1671c2d6442 = function(arg02, arg12, arg2) {
        arg02.blendFunc(arg12 >>> 0, arg2 >>> 0);
      };
      imports.wbg.__wbg_blendFunc_57545f7f7240fd88 = function(arg02, arg12, arg2) {
        arg02.blendFunc(arg12 >>> 0, arg2 >>> 0);
      };
      imports.wbg.__wbg_blitFramebuffer_b2732a9904aa5f9a = function(arg02, arg12, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
        arg02.blitFramebuffer(arg12, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0);
      };
      imports.wbg.__wbg_blockSize_6464e214800294a9 = function(arg02) {
        const ret2 = arg02.blockSize;
        return ret2;
      };
      imports.wbg.__wbg_body_8d7d8c4aa91dcad8 = function(arg02) {
        const ret2 = arg02.body;
        return isLikeNone(ret2) ? 0 : addToExternrefTable0(ret2);
      };
      imports.wbg.__wbg_brand_67e4f3d950154d0a = function(arg02, arg12) {
        const ret2 = arg12.brand;
        const ptr1 = passStringToWasm0(ret2, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg02 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg02 + 4 * 0, ptr1, true);
      };
      imports.wbg.__wbg_brands_1ec54d613da9db02 = function(arg02) {
        const ret2 = arg02.brands;
        return ret2;
      };
      imports.wbg.__wbg_bufferData_0643498950a2292f = function(arg02, arg12, arg2, arg3) {
        arg02.bufferData(arg12 >>> 0, arg2, arg3 >>> 0);
      };
      imports.wbg.__wbg_bufferData_618f2917f283ed2d = function(arg02, arg12, arg2, arg3) {
        arg02.bufferData(arg12 >>> 0, arg2, arg3 >>> 0);
      };
      imports.wbg.__wbg_bufferData_7e2b6059c35c9291 = function(arg02, arg12, arg2, arg3) {
        arg02.bufferData(arg12 >>> 0, arg2, arg3 >>> 0);
      };
      imports.wbg.__wbg_bufferData_be9f114b6d1ce00b = function(arg02, arg12, arg2, arg3) {
        arg02.bufferData(arg12 >>> 0, arg2, arg3 >>> 0);
      };
      imports.wbg.__wbg_bufferSubData_72cb32e32d111392 = function(arg02, arg12, arg2, arg3) {
        arg02.bufferSubData(arg12 >>> 0, arg2, arg3);
      };
      imports.wbg.__wbg_bufferSubData_fac15d2090589d38 = function(arg02, arg12, arg2, arg3) {
        arg02.bufferSubData(arg12 >>> 0, arg2, arg3);
      };
      imports.wbg.__wbg_buffer_61b7ce01341d7f88 = function(arg02) {
        const ret2 = arg02.buffer;
        return ret2;
      };
      imports.wbg.__wbg_button_12b22015f2d5993d = function(arg02) {
        const ret2 = arg02.button;
        return ret2;
      };
      imports.wbg.__wbg_buttons_568290cbe933b39a = function(arg02) {
        const ret2 = arg02.buttons;
        return ret2;
      };
      imports.wbg.__wbg_buttons_e83cec0abc6f937f = function(arg02) {
        const ret2 = arg02.buttons;
        return ret2;
      };
      imports.wbg.__wbg_call_500db948e69c7330 = function() {
        return handleError(function(arg02, arg12, arg2) {
          const ret2 = arg02.call(arg12, arg2);
          return ret2;
        }, arguments);
      };
      imports.wbg.__wbg_call_b0d8e36992d9900d = function() {
        return handleError(function(arg02, arg12) {
          const ret2 = arg02.call(arg12);
          return ret2;
        }, arguments);
      };
      imports.wbg.__wbg_cancelAnimationFrame_5f7904867f6ab804 = function() {
        return handleError(function(arg02, arg12) {
          arg02.cancelAnimationFrame(arg12);
        }, arguments);
      };
      imports.wbg.__wbg_cancelIdleCallback_511311272bf3c490 = function(arg02, arg12) {
        arg02.cancelIdleCallback(arg12 >>> 0);
      };
      imports.wbg.__wbg_cancel_3b69067dcdf7ffb7 = function(arg02) {
        arg02.cancel();
      };
      imports.wbg.__wbg_catch_d0fc80129c999ab3 = function(arg02, arg12) {
        const ret2 = arg02.catch(arg12);
        return ret2;
      };
      imports.wbg.__wbg_clearBufferiv_0606fb1b2d1a2a23 = function(arg02, arg12, arg2, arg3, arg4) {
        arg02.clearBufferiv(arg12 >>> 0, arg2, getArrayI32FromWasm0(arg3, arg4));
      };
      imports.wbg.__wbg_clearBufferuiv_a10c437649deef29 = function(arg02, arg12, arg2, arg3, arg4) {
        arg02.clearBufferuiv(arg12 >>> 0, arg2, getArrayU32FromWasm0(arg3, arg4));
      };
      imports.wbg.__wbg_clearColor_7e5806f100e4cd7a = function(arg02, arg12, arg2, arg3, arg4) {
        arg02.clearColor(arg12, arg2, arg3, arg4);
      };
      imports.wbg.__wbg_clearColor_d58166c97d5eef07 = function(arg02, arg12, arg2, arg3, arg4) {
        arg02.clearColor(arg12, arg2, arg3, arg4);
      };
      imports.wbg.__wbg_clearDepth_09770ed9850b53ca = function(arg02, arg12) {
        arg02.clearDepth(arg12);
      };
      imports.wbg.__wbg_clearDepth_2634fb35e857706d = function(arg02, arg12) {
        arg02.clearDepth(arg12);
      };
      imports.wbg.__wbg_clearStencil_1569884ab4ec561a = function(arg02, arg12) {
        arg02.clearStencil(arg12);
      };
      imports.wbg.__wbg_clearStencil_55dcc514b986536b = function(arg02, arg12) {
        arg02.clearStencil(arg12);
      };
      imports.wbg.__wbg_clearTimeout_af66bc7e0dd9b02b = function(arg02, arg12) {
        arg02.clearTimeout(arg12);
      };
      imports.wbg.__wbg_clear_16ffdcc1a1d6f0c9 = function(arg02, arg12) {
        arg02.clear(arg12 >>> 0);
      };
      imports.wbg.__wbg_clear_c182acb53176ea8b = function(arg02, arg12) {
        arg02.clear(arg12 >>> 0);
      };
      imports.wbg.__wbg_clientWaitSync_43e929bdfdac99d0 = function(arg02, arg12, arg2, arg3) {
        const ret2 = arg02.clientWaitSync(arg12, arg2 >>> 0, arg3 >>> 0);
        return ret2;
      };
      imports.wbg.__wbg_clipboardData_d188aa1b339f8637 = function(arg02) {
        const ret2 = arg02.clipboardData;
        return isLikeNone(ret2) ? 0 : addToExternrefTable0(ret2);
      };
      imports.wbg.__wbg_clipboard_b634c08b310bca2e = function(arg02) {
        const ret2 = arg02.clipboard;
        return ret2;
      };
      imports.wbg.__wbg_close_aa3f739f6c647087 = function() {
        return handleError(function(arg02) {
          const ret2 = arg02.close();
          return ret2;
        }, arguments);
      };
      imports.wbg.__wbg_close_b102ec699b1075d4 = function(arg02) {
        arg02.close();
      };
      imports.wbg.__wbg_code_878e1961e18ba92f = function(arg02, arg12) {
        const ret2 = arg12.code;
        const ptr1 = passStringToWasm0(ret2, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg02 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg02 + 4 * 0, ptr1, true);
      };
      imports.wbg.__wbg_colorMask_04bc7392c9d1b568 = function(arg02, arg12, arg2, arg3, arg4) {
        arg02.colorMask(arg12 !== 0, arg2 !== 0, arg3 !== 0, arg4 !== 0);
      };
      imports.wbg.__wbg_colorMask_401f99e62155b996 = function(arg02, arg12, arg2, arg3, arg4) {
        arg02.colorMask(arg12 !== 0, arg2 !== 0, arg3 !== 0, arg4 !== 0);
      };
      imports.wbg.__wbg_compileShader_afcc43901f14a922 = function(arg02, arg12) {
        arg02.compileShader(arg12);
      };
      imports.wbg.__wbg_compileShader_fab2df50ae89c5e1 = function(arg02, arg12) {
        arg02.compileShader(arg12);
      };
      imports.wbg.__wbg_compressedTexSubImage2D_918f2367c157fd0c = function(arg02, arg12, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
        arg02.compressedTexSubImage2D(arg12 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8);
      };
      imports.wbg.__wbg_compressedTexSubImage2D_b35753ef6ad8770a = function(arg02, arg12, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
        arg02.compressedTexSubImage2D(arg12 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8, arg9);
      };
      imports.wbg.__wbg_compressedTexSubImage2D_d6f7b105748dbad9 = function(arg02, arg12, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
        arg02.compressedTexSubImage2D(arg12 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8);
      };
      imports.wbg.__wbg_compressedTexSubImage3D_95d6e6c886d07077 = function(arg02, arg12, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
        arg02.compressedTexSubImage3D(arg12 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10, arg11);
      };
      imports.wbg.__wbg_compressedTexSubImage3D_d0a241ff5f026316 = function(arg02, arg12, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
        arg02.compressedTexSubImage3D(arg12 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10);
      };
      imports.wbg.__wbg_connect_b5b9b381c6b728c5 = function() {
        return handleError(function(arg02, arg12) {
          const ret2 = arg02.connect(arg12);
          return ret2;
        }, arguments);
      };
      imports.wbg.__wbg_connected_bc8d146bbcff76c7 = function(arg02) {
        const ret2 = arg02.connected;
        return ret2;
      };
      imports.wbg.__wbg_contains_12e954301a3dcdc7 = function(arg02, arg12) {
        const ret2 = arg02.contains(arg12);
        return ret2;
      };
      imports.wbg.__wbg_contentRect_6fadfee6731ac5df = function(arg02) {
        const ret2 = arg02.contentRect;
        return ret2;
      };
      imports.wbg.__wbg_copyBufferSubData_649b323af0d7bed7 = function(arg02, arg12, arg2, arg3, arg4, arg5) {
        arg02.copyBufferSubData(arg12 >>> 0, arg2 >>> 0, arg3, arg4, arg5);
      };
      imports.wbg.__wbg_copyTexSubImage2D_1bfee3392d4647ed = function(arg02, arg12, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
        arg02.copyTexSubImage2D(arg12 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8);
      };
      imports.wbg.__wbg_copyTexSubImage2D_359aaa61913ab963 = function(arg02, arg12, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
        arg02.copyTexSubImage2D(arg12 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8);
      };
      imports.wbg.__wbg_copyTexSubImage3D_9b7dbe58ee71c6ee = function(arg02, arg12, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
        arg02.copyTexSubImage3D(arg12 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9);
      };
      imports.wbg.__wbg_copyToChannel_392b6d20f7a9be4e = function() {
        return handleError(function(arg02, arg12, arg2, arg3) {
          arg02.copyToChannel(getArrayF32FromWasm0(arg12, arg2), arg3);
        }, arguments);
      };
      imports.wbg.__wbg_createBufferSource_40fde2c8ce87b45f = function() {
        return handleError(function(arg02) {
          const ret2 = arg02.createBufferSource();
          return ret2;
        }, arguments);
      };
      imports.wbg.__wbg_createBuffer_4c730c8729630f69 = function() {
        return handleError(function(arg02, arg12, arg2, arg3) {
          const ret2 = arg02.createBuffer(arg12 >>> 0, arg2 >>> 0, arg3);
          return ret2;
        }, arguments);
      };
      imports.wbg.__wbg_createBuffer_567b536a03db30d2 = function(arg02) {
        const ret2 = arg02.createBuffer();
        return isLikeNone(ret2) ? 0 : addToExternrefTable0(ret2);
      };
      imports.wbg.__wbg_createBuffer_8692729b8ac9caaf = function(arg02) {
        const ret2 = arg02.createBuffer();
        return isLikeNone(ret2) ? 0 : addToExternrefTable0(ret2);
      };
      imports.wbg.__wbg_createElement_89923fcb809656b7 = function() {
        return handleError(function(arg02, arg12, arg2) {
          const ret2 = arg02.createElement(getStringFromWasm0(arg12, arg2));
          return ret2;
        }, arguments);
      };
      imports.wbg.__wbg_createFramebuffer_346cd4e0b98b15c4 = function(arg02) {
        const ret2 = arg02.createFramebuffer();
        return isLikeNone(ret2) ? 0 : addToExternrefTable0(ret2);
      };
      imports.wbg.__wbg_createFramebuffer_a3361909a5a3c966 = function(arg02) {
        const ret2 = arg02.createFramebuffer();
        return isLikeNone(ret2) ? 0 : addToExternrefTable0(ret2);
      };
      imports.wbg.__wbg_createObjectURL_296ad2113ed20fe0 = function() {
        return handleError(function(arg02, arg12) {
          const ret2 = URL.createObjectURL(arg12);
          const ptr1 = passStringToWasm0(ret2, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
          const len1 = WASM_VECTOR_LEN;
          getDataViewMemory0().setInt32(arg02 + 4 * 1, len1, true);
          getDataViewMemory0().setInt32(arg02 + 4 * 0, ptr1, true);
        }, arguments);
      };
      imports.wbg.__wbg_createProgram_b8f69529220fb50b = function(arg02) {
        const ret2 = arg02.createProgram();
        return isLikeNone(ret2) ? 0 : addToExternrefTable0(ret2);
      };
      imports.wbg.__wbg_createProgram_e2141127012594b0 = function(arg02) {
        const ret2 = arg02.createProgram();
        return isLikeNone(ret2) ? 0 : addToExternrefTable0(ret2);
      };
      imports.wbg.__wbg_createQuery_31dfa91163ee063b = function(arg02) {
        const ret2 = arg02.createQuery();
        return isLikeNone(ret2) ? 0 : addToExternrefTable0(ret2);
      };
      imports.wbg.__wbg_createRenderbuffer_82b325966b1c6114 = function(arg02) {
        const ret2 = arg02.createRenderbuffer();
        return isLikeNone(ret2) ? 0 : addToExternrefTable0(ret2);
      };
      imports.wbg.__wbg_createRenderbuffer_b00f90e7450a2820 = function(arg02) {
        const ret2 = arg02.createRenderbuffer();
        return isLikeNone(ret2) ? 0 : addToExternrefTable0(ret2);
      };
      imports.wbg.__wbg_createSampler_79b0a9898fb95edf = function(arg02) {
        const ret2 = arg02.createSampler();
        return isLikeNone(ret2) ? 0 : addToExternrefTable0(ret2);
      };
      imports.wbg.__wbg_createShader_442f69b8f536a786 = function(arg02, arg12) {
        const ret2 = arg02.createShader(arg12 >>> 0);
        return isLikeNone(ret2) ? 0 : addToExternrefTable0(ret2);
      };
      imports.wbg.__wbg_createShader_809bd3abe629ad7a = function(arg02, arg12) {
        const ret2 = arg02.createShader(arg12 >>> 0);
        return isLikeNone(ret2) ? 0 : addToExternrefTable0(ret2);
      };
      imports.wbg.__wbg_createTexture_3c9e731e954515fa = function(arg02) {
        const ret2 = arg02.createTexture();
        return isLikeNone(ret2) ? 0 : addToExternrefTable0(ret2);
      };
      imports.wbg.__wbg_createTexture_677a150f3f985ce0 = function(arg02) {
        const ret2 = arg02.createTexture();
        return isLikeNone(ret2) ? 0 : addToExternrefTable0(ret2);
      };
      imports.wbg.__wbg_createVertexArrayOES_950dd712f273bb06 = function(arg02) {
        const ret2 = arg02.createVertexArrayOES();
        return isLikeNone(ret2) ? 0 : addToExternrefTable0(ret2);
      };
      imports.wbg.__wbg_createVertexArray_68ae270682fc14aa = function(arg02) {
        const ret2 = arg02.createVertexArray();
        return isLikeNone(ret2) ? 0 : addToExternrefTable0(ret2);
      };
      imports.wbg.__wbg_crypto_ed58b8e10a292839 = function(arg02) {
        const ret2 = arg02.crypto;
        return ret2;
      };
      imports.wbg.__wbg_ctrlKey_5a324c8556fbce1c = function(arg02) {
        const ret2 = arg02.ctrlKey;
        return ret2;
      };
      imports.wbg.__wbg_ctrlKey_5c308955b0d5492d = function(arg02) {
        const ret2 = arg02.ctrlKey;
        return ret2;
      };
      imports.wbg.__wbg_cullFace_d68398a8ce2f6fe3 = function(arg02, arg12) {
        arg02.cullFace(arg12 >>> 0);
      };
      imports.wbg.__wbg_cullFace_dbad3db56721e436 = function(arg02, arg12) {
        arg02.cullFace(arg12 >>> 0);
      };
      imports.wbg.__wbg_currentTime_00c5c555e14a5405 = function(arg02) {
        const ret2 = arg02.currentTime;
        return ret2;
      };
      imports.wbg.__wbg_deleteBuffer_783d60e842697847 = function(arg02, arg12) {
        arg02.deleteBuffer(arg12);
      };
      imports.wbg.__wbg_deleteBuffer_bf5a34580654a42a = function(arg02, arg12) {
        arg02.deleteBuffer(arg12);
      };
      imports.wbg.__wbg_deleteFramebuffer_73b3cd0be3d68d24 = function(arg02, arg12) {
        arg02.deleteFramebuffer(arg12);
      };
      imports.wbg.__wbg_deleteFramebuffer_f91ceb4755e7bed3 = function(arg02, arg12) {
        arg02.deleteFramebuffer(arg12);
      };
      imports.wbg.__wbg_deleteProgram_3ca13ed49ca24a48 = function(arg02, arg12) {
        arg02.deleteProgram(arg12);
      };
      imports.wbg.__wbg_deleteProgram_47e8c8c7f0923d3d = function(arg02, arg12) {
        arg02.deleteProgram(arg12);
      };
      imports.wbg.__wbg_deleteQuery_4d8b5ae45694bf79 = function(arg02, arg12) {
        arg02.deleteQuery(arg12);
      };
      imports.wbg.__wbg_deleteRenderbuffer_36ac432b5656c10f = function(arg02, arg12) {
        arg02.deleteRenderbuffer(arg12);
      };
      imports.wbg.__wbg_deleteRenderbuffer_867d9aaec2e09190 = function(arg02, arg12) {
        arg02.deleteRenderbuffer(arg12);
      };
      imports.wbg.__wbg_deleteSampler_e3b7bb05c49ac425 = function(arg02, arg12) {
        arg02.deleteSampler(arg12);
      };
      imports.wbg.__wbg_deleteShader_e1f71043508b6951 = function(arg02, arg12) {
        arg02.deleteShader(arg12);
      };
      imports.wbg.__wbg_deleteShader_e4fe2574d9c3afab = function(arg02, arg12) {
        arg02.deleteShader(arg12);
      };
      imports.wbg.__wbg_deleteSync_925fececf3795207 = function(arg02, arg12) {
        arg02.deleteSync(arg12);
      };
      imports.wbg.__wbg_deleteTexture_36653aa53d4a29e9 = function(arg02, arg12) {
        arg02.deleteTexture(arg12);
      };
      imports.wbg.__wbg_deleteTexture_eaf729f97b59aaf4 = function(arg02, arg12) {
        arg02.deleteTexture(arg12);
      };
      imports.wbg.__wbg_deleteVertexArrayOES_0de32bd8adddeecb = function(arg02, arg12) {
        arg02.deleteVertexArrayOES(arg12);
      };
      imports.wbg.__wbg_deleteVertexArray_cff2c6ab55f2c8b6 = function(arg02, arg12) {
        arg02.deleteVertexArray(arg12);
      };
      imports.wbg.__wbg_deltaMode_b2e9bb0dca5cf196 = function(arg02) {
        const ret2 = arg02.deltaMode;
        return ret2;
      };
      imports.wbg.__wbg_deltaX_5c26d3b55d406732 = function(arg02) {
        const ret2 = arg02.deltaX;
        return ret2;
      };
      imports.wbg.__wbg_deltaY_1683a859ce933add = function(arg02) {
        const ret2 = arg02.deltaY;
        return ret2;
      };
      imports.wbg.__wbg_depthFunc_351a7bf1596d4061 = function(arg02, arg12) {
        arg02.depthFunc(arg12 >>> 0);
      };
      imports.wbg.__wbg_depthFunc_70ac0cb861c8a03b = function(arg02, arg12) {
        arg02.depthFunc(arg12 >>> 0);
      };
      imports.wbg.__wbg_depthMask_0ff63f0d4501072b = function(arg02, arg12) {
        arg02.depthMask(arg12 !== 0);
      };
      imports.wbg.__wbg_depthMask_3daac0e40564953e = function(arg02, arg12) {
        arg02.depthMask(arg12 !== 0);
      };
      imports.wbg.__wbg_depthRange_872f6de9705a826c = function(arg02, arg12, arg2) {
        arg02.depthRange(arg12, arg2);
      };
      imports.wbg.__wbg_depthRange_febb5e8bd978fe0e = function(arg02, arg12, arg2) {
        arg02.depthRange(arg12, arg2);
      };
      imports.wbg.__wbg_destination_6ff3c21ce0beee02 = function(arg02) {
        const ret2 = arg02.destination;
        return ret2;
      };
      imports.wbg.__wbg_devicePixelContentBoxSize_f91b326c21f7e3d5 = function(arg02) {
        const ret2 = arg02.devicePixelContentBoxSize;
        return ret2;
      };
      imports.wbg.__wbg_devicePixelRatio_973abafaa5e8254b = function(arg02) {
        const ret2 = arg02.devicePixelRatio;
        return ret2;
      };
      imports.wbg.__wbg_disableVertexAttribArray_1bf5b473f133c8ab = function(arg02, arg12) {
        arg02.disableVertexAttribArray(arg12 >>> 0);
      };
      imports.wbg.__wbg_disableVertexAttribArray_f49780d5b42e6b0d = function(arg02, arg12) {
        arg02.disableVertexAttribArray(arg12 >>> 0);
      };
      imports.wbg.__wbg_disable_2f09f593bf0f5573 = function(arg02, arg12) {
        arg02.disable(arg12 >>> 0);
      };
      imports.wbg.__wbg_disable_302597eacd491d44 = function(arg02, arg12) {
        arg02.disable(arg12 >>> 0);
      };
      imports.wbg.__wbg_disconnect_6e7f07912b7a73c6 = function(arg02) {
        arg02.disconnect();
      };
      imports.wbg.__wbg_disconnect_c350961ad9f8057a = function(arg02) {
        arg02.disconnect();
      };
      imports.wbg.__wbg_document_f11bc4f7c03e1745 = function(arg02) {
        const ret2 = arg02.document;
        return isLikeNone(ret2) ? 0 : addToExternrefTable0(ret2);
      };
      imports.wbg.__wbg_drawArraysInstancedANGLE_966863941d85fceb = function(arg02, arg12, arg2, arg3, arg4) {
        arg02.drawArraysInstancedANGLE(arg12 >>> 0, arg2, arg3, arg4);
      };
      imports.wbg.__wbg_drawArraysInstanced_fae83959489569b9 = function(arg02, arg12, arg2, arg3, arg4) {
        arg02.drawArraysInstanced(arg12 >>> 0, arg2, arg3, arg4);
      };
      imports.wbg.__wbg_drawArrays_01e26acf05821932 = function(arg02, arg12, arg2, arg3) {
        arg02.drawArrays(arg12 >>> 0, arg2, arg3);
      };
      imports.wbg.__wbg_drawArrays_32d97bfaf282c738 = function(arg02, arg12, arg2, arg3) {
        arg02.drawArrays(arg12 >>> 0, arg2, arg3);
      };
      imports.wbg.__wbg_drawBuffersWEBGL_f5eea4913dbb3ac0 = function(arg02, arg12) {
        arg02.drawBuffersWEBGL(arg12);
      };
      imports.wbg.__wbg_drawBuffers_5a72890eb9a6161d = function(arg02, arg12) {
        arg02.drawBuffers(arg12);
      };
      imports.wbg.__wbg_drawElementsInstancedANGLE_68db220ea0b974d4 = function(arg02, arg12, arg2, arg3, arg4, arg5) {
        arg02.drawElementsInstancedANGLE(arg12 >>> 0, arg2, arg3 >>> 0, arg4, arg5);
      };
      imports.wbg.__wbg_drawElementsInstanced_31cba585f87c4481 = function(arg02, arg12, arg2, arg3, arg4, arg5) {
        arg02.drawElementsInstanced(arg12 >>> 0, arg2, arg3 >>> 0, arg4, arg5);
      };
      imports.wbg.__wbg_enableVertexAttribArray_211547224fc25327 = function(arg02, arg12) {
        arg02.enableVertexAttribArray(arg12 >>> 0);
      };
      imports.wbg.__wbg_enableVertexAttribArray_60827f2a43782639 = function(arg02, arg12) {
        arg02.enableVertexAttribArray(arg12 >>> 0);
      };
      imports.wbg.__wbg_enable_2bacfac56e802b11 = function(arg02, arg12) {
        arg02.enable(arg12 >>> 0);
      };
      imports.wbg.__wbg_enable_a7767e03f7973ca8 = function(arg02, arg12) {
        arg02.enable(arg12 >>> 0);
      };
      imports.wbg.__wbg_endQuery_b8c16bf6865f8274 = function(arg02, arg12) {
        arg02.endQuery(arg12 >>> 0);
      };
      imports.wbg.__wbg_error_7534b8e9a36f1ab4 = function(arg02, arg12) {
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
      imports.wbg.__wbg_error_bc396fc38839dd25 = function(arg02, arg12) {
        console.error(arg02, arg12);
      };
      imports.wbg.__wbg_eval_68f6a76060f3eaaf = function(arg0) {
        eval(arg0);
      };
      imports.wbg.__wbg_eval_cd0c386c3899dd07 = function() {
        return handleError(function(arg0, arg1) {
          const ret = eval(getStringFromWasm0(arg0, arg1));
          return ret;
        }, arguments);
      };
      imports.wbg.__wbg_exec_2630a18b88ec1a61 = function(arg02, arg12, arg2) {
        const ret2 = arg02.exec(getStringFromWasm0(arg12, arg2));
        return isLikeNone(ret2) ? 0 : addToExternrefTable0(ret2);
      };
      imports.wbg.__wbg_exitFullscreen_c9c2c41beb64ef2f = function(arg02) {
        arg02.exitFullscreen();
      };
      imports.wbg.__wbg_exitPointerLock_bbd1b0a5297d428d = function(arg02) {
        arg02.exitPointerLock();
      };
      imports.wbg.__wbg_fenceSync_a11f4721fc400f2d = function(arg02, arg12, arg2) {
        const ret2 = arg02.fenceSync(arg12 >>> 0, arg2 >>> 0);
        return isLikeNone(ret2) ? 0 : addToExternrefTable0(ret2);
      };
      imports.wbg.__wbg_fetch_58cc163d77b34fb1 = function(arg02, arg12, arg2) {
        const ret2 = arg02.fetch(getStringFromWasm0(arg12, arg2));
        return ret2;
      };
      imports.wbg.__wbg_fetch_6a5bc16a35f71316 = function(arg02, arg12, arg2) {
        const ret2 = arg02.fetch(getStringFromWasm0(arg12, arg2));
        return ret2;
      };
      imports.wbg.__wbg_focus_35fe945f7268dd62 = function() {
        return handleError(function(arg02) {
          arg02.focus();
        }, arguments);
      };
      imports.wbg.__wbg_framebufferRenderbuffer_a51d38203e558ea9 = function(arg02, arg12, arg2, arg3, arg4) {
        arg02.framebufferRenderbuffer(arg12 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4);
      };
      imports.wbg.__wbg_framebufferRenderbuffer_d198a03c2c5c7581 = function(arg02, arg12, arg2, arg3, arg4) {
        arg02.framebufferRenderbuffer(arg12 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4);
      };
      imports.wbg.__wbg_framebufferTexture2D_86a2063326486ec7 = function(arg02, arg12, arg2, arg3, arg4, arg5) {
        arg02.framebufferTexture2D(arg12 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4, arg5);
      };
      imports.wbg.__wbg_framebufferTexture2D_a1a6486dde56610f = function(arg02, arg12, arg2, arg3, arg4, arg5) {
        arg02.framebufferTexture2D(arg12 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4, arg5);
      };
      imports.wbg.__wbg_framebufferTextureLayer_12c11d57e6a4c64f = function(arg02, arg12, arg2, arg3, arg4, arg5) {
        arg02.framebufferTextureLayer(arg12 >>> 0, arg2 >>> 0, arg3, arg4, arg5);
      };
      imports.wbg.__wbg_framebufferTextureMultiviewOVR_31a4fd0718dbe567 = function(arg02, arg12, arg2, arg3, arg4, arg5, arg6) {
        arg02.framebufferTextureMultiviewOVR(arg12 >>> 0, arg2 >>> 0, arg3, arg4, arg5, arg6);
      };
      imports.wbg.__wbg_frontFace_f05d4ebc9795b232 = function(arg02, arg12) {
        arg02.frontFace(arg12 >>> 0);
      };
      imports.wbg.__wbg_frontFace_fd41ceb920a4949d = function(arg02, arg12) {
        arg02.frontFace(arg12 >>> 0);
      };
      imports.wbg.__wbg_fullscreenElement_d6cbbb5d5f0362c4 = function(arg02) {
        const ret2 = arg02.fullscreenElement;
        return isLikeNone(ret2) ? 0 : addToExternrefTable0(ret2);
      };
      imports.wbg.__wbg_getBoundingClientRect_05c4b9e3701bb372 = function(arg02) {
        const ret2 = arg02.getBoundingClientRect();
        return ret2;
      };
      imports.wbg.__wbg_getBufferSubData_af1f61d38b0f3066 = function(arg02, arg12, arg2, arg3) {
        arg02.getBufferSubData(arg12 >>> 0, arg2, arg3);
      };
      imports.wbg.__wbg_getCoalescedEvents_1372a1922f78401a = function(arg02) {
        const ret2 = arg02.getCoalescedEvents;
        return ret2;
      };
      imports.wbg.__wbg_getCoalescedEvents_f51eabe0483efd6f = function(arg02) {
        const ret2 = arg02.getCoalescedEvents();
        return ret2;
      };
      imports.wbg.__wbg_getComputedStyle_8e58bbd76370e2b1 = function() {
        return handleError(function(arg02, arg12) {
          const ret2 = arg02.getComputedStyle(arg12);
          return isLikeNone(ret2) ? 0 : addToExternrefTable0(ret2);
        }, arguments);
      };
      imports.wbg.__wbg_getContext_0ceb5ecb5266d11f = function() {
        return handleError(function(arg02, arg12, arg2, arg3) {
          const ret2 = arg02.getContext(getStringFromWasm0(arg12, arg2), arg3);
          return isLikeNone(ret2) ? 0 : addToExternrefTable0(ret2);
        }, arguments);
      };
      imports.wbg.__wbg_getContext_0d352527e1372866 = function() {
        return handleError(function(arg02, arg12, arg2, arg3) {
          const ret2 = arg02.getContext(getStringFromWasm0(arg12, arg2), arg3);
          return isLikeNone(ret2) ? 0 : addToExternrefTable0(ret2);
        }, arguments);
      };
      imports.wbg.__wbg_getData_a7e2258d0a97ce17 = function() {
        return handleError(function(arg02, arg12, arg2, arg3) {
          const ret2 = arg12.getData(getStringFromWasm0(arg2, arg3));
          const ptr1 = passStringToWasm0(ret2, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
          const len1 = WASM_VECTOR_LEN;
          getDataViewMemory0().setInt32(arg02 + 4 * 1, len1, true);
          getDataViewMemory0().setInt32(arg02 + 4 * 0, ptr1, true);
        }, arguments);
      };
      imports.wbg.__wbg_getExtension_f31653ddc3f1cef9 = function() {
        return handleError(function(arg02, arg12, arg2) {
          const ret2 = arg02.getExtension(getStringFromWasm0(arg12, arg2));
          return isLikeNone(ret2) ? 0 : addToExternrefTable0(ret2);
        }, arguments);
      };
      imports.wbg.__wbg_getGamepads_e8ce23216a222f56 = function() {
        return handleError(function(arg02) {
          const ret2 = arg02.getGamepads();
          return ret2;
        }, arguments);
      };
      imports.wbg.__wbg_getIndexedParameter_b15a32a9e355913b = function() {
        return handleError(function(arg02, arg12, arg2) {
          const ret2 = arg02.getIndexedParameter(arg12 >>> 0, arg2 >>> 0);
          return ret2;
        }, arguments);
      };
      imports.wbg.__wbg_getOwnPropertyDescriptor_da0bd3d3d60cf5c1 = function(arg02, arg12) {
        const ret2 = Object.getOwnPropertyDescriptor(arg02, arg12);
        return ret2;
      };
      imports.wbg.__wbg_getParameter_6f7bc820485dbae4 = function() {
        return handleError(function(arg02, arg12) {
          const ret2 = arg02.getParameter(arg12 >>> 0);
          return ret2;
        }, arguments);
      };
      imports.wbg.__wbg_getParameter_fc177c1d22da930b = function() {
        return handleError(function(arg02, arg12) {
          const ret2 = arg02.getParameter(arg12 >>> 0);
          return ret2;
        }, arguments);
      };
      imports.wbg.__wbg_getProgramInfoLog_70d114345e15d2c1 = function(arg02, arg12, arg2) {
        const ret2 = arg12.getProgramInfoLog(arg2);
        var ptr1 = isLikeNone(ret2) ? 0 : passStringToWasm0(ret2, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg02 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg02 + 4 * 0, ptr1, true);
      };
      imports.wbg.__wbg_getProgramInfoLog_760af7d6753bc699 = function(arg02, arg12, arg2) {
        const ret2 = arg12.getProgramInfoLog(arg2);
        var ptr1 = isLikeNone(ret2) ? 0 : passStringToWasm0(ret2, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg02 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg02 + 4 * 0, ptr1, true);
      };
      imports.wbg.__wbg_getProgramParameter_8a6b724d42d813b3 = function(arg02, arg12, arg2) {
        const ret2 = arg02.getProgramParameter(arg12, arg2 >>> 0);
        return ret2;
      };
      imports.wbg.__wbg_getProgramParameter_d328869400b82698 = function(arg02, arg12, arg2) {
        const ret2 = arg02.getProgramParameter(arg12, arg2 >>> 0);
        return ret2;
      };
      imports.wbg.__wbg_getPropertyValue_66c16bac362c6d90 = function() {
        return handleError(function(arg02, arg12, arg2, arg3) {
          const ret2 = arg12.getPropertyValue(getStringFromWasm0(arg2, arg3));
          const ptr1 = passStringToWasm0(ret2, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
          const len1 = WASM_VECTOR_LEN;
          getDataViewMemory0().setInt32(arg02 + 4 * 1, len1, true);
          getDataViewMemory0().setInt32(arg02 + 4 * 0, ptr1, true);
        }, arguments);
      };
      imports.wbg.__wbg_getQueryParameter_85a1d61cc4ccdb26 = function(arg02, arg12, arg2) {
        const ret2 = arg02.getQueryParameter(arg12, arg2 >>> 0);
        return ret2;
      };
      imports.wbg.__wbg_getRandomValues_bcb4912f16000dc4 = function() {
        return handleError(function(arg02, arg12) {
          arg02.getRandomValues(arg12);
        }, arguments);
      };
      imports.wbg.__wbg_getShaderInfoLog_23dd787b504d5f4e = function(arg02, arg12, arg2) {
        const ret2 = arg12.getShaderInfoLog(arg2);
        var ptr1 = isLikeNone(ret2) ? 0 : passStringToWasm0(ret2, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg02 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg02 + 4 * 0, ptr1, true);
      };
      imports.wbg.__wbg_getShaderInfoLog_da62e75d61fbf8a8 = function(arg02, arg12, arg2) {
        const ret2 = arg12.getShaderInfoLog(arg2);
        var ptr1 = isLikeNone(ret2) ? 0 : passStringToWasm0(ret2, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg02 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg02 + 4 * 0, ptr1, true);
      };
      imports.wbg.__wbg_getShaderParameter_e9098a633e6cf618 = function(arg02, arg12, arg2) {
        const ret2 = arg02.getShaderParameter(arg12, arg2 >>> 0);
        return ret2;
      };
      imports.wbg.__wbg_getShaderParameter_f9c66f7ac8114c69 = function(arg02, arg12, arg2) {
        const ret2 = arg02.getShaderParameter(arg12, arg2 >>> 0);
        return ret2;
      };
      imports.wbg.__wbg_getSupportedExtensions_3ce4548166177471 = function(arg02) {
        const ret2 = arg02.getSupportedExtensions();
        return isLikeNone(ret2) ? 0 : addToExternrefTable0(ret2);
      };
      imports.wbg.__wbg_getSupportedProfiles_89666dd28eef1d6b = function(arg02) {
        const ret2 = arg02.getSupportedProfiles();
        return isLikeNone(ret2) ? 0 : addToExternrefTable0(ret2);
      };
      imports.wbg.__wbg_getSyncParameter_7747b0ea559e006f = function(arg02, arg12, arg2) {
        const ret2 = arg02.getSyncParameter(arg12, arg2 >>> 0);
        return ret2;
      };
      imports.wbg.__wbg_getUniformBlockIndex_9811be246a537d1b = function(arg02, arg12, arg2, arg3) {
        const ret2 = arg02.getUniformBlockIndex(arg12, getStringFromWasm0(arg2, arg3));
        return ret2;
      };
      imports.wbg.__wbg_getUniformLocation_95f3933486db473c = function(arg02, arg12, arg2, arg3) {
        const ret2 = arg02.getUniformLocation(arg12, getStringFromWasm0(arg2, arg3));
        return isLikeNone(ret2) ? 0 : addToExternrefTable0(ret2);
      };
      imports.wbg.__wbg_getUniformLocation_b9be4fbca76ab9a4 = function(arg02, arg12, arg2, arg3) {
        const ret2 = arg02.getUniformLocation(arg12, getStringFromWasm0(arg2, arg3));
        return isLikeNone(ret2) ? 0 : addToExternrefTable0(ret2);
      };
      imports.wbg.__wbg_get_9aa3dff3f0266054 = function(arg02, arg12) {
        const ret2 = arg02[arg12 >>> 0];
        return ret2;
      };
      imports.wbg.__wbg_height_08fd44318e18021d = function(arg02) {
        const ret2 = arg02.height;
        return ret2;
      };
      imports.wbg.__wbg_height_6e1c5b8f51135ee0 = function(arg02) {
        const ret2 = arg02.height;
        return ret2;
      };
      imports.wbg.__wbg_height_f36c36e27347cf38 = function(arg02) {
        const ret2 = arg02.height;
        return ret2;
      };
      imports.wbg.__wbg_height_f63e673a1de30884 = function(arg02) {
        const ret2 = arg02.height;
        return ret2;
      };
      imports.wbg.__wbg_id_5171f0812b638d4b = function(arg02, arg12) {
        const ret2 = arg12.id;
        const ptr1 = passStringToWasm0(ret2, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg02 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg02 + 4 * 0, ptr1, true);
      };
      imports.wbg.__wbg_includes_48df4cb918d24687 = function(arg02, arg12, arg2) {
        const ret2 = arg02.includes(arg12, arg2);
        return ret2;
      };
      imports.wbg.__wbg_index_229b6e37ebc563dc = function(arg02) {
        const ret2 = arg02.index;
        return ret2;
      };
      imports.wbg.__wbg_inlineSize_60da5bea0a6275d2 = function(arg02) {
        const ret2 = arg02.inlineSize;
        return ret2;
      };
      imports.wbg.__wbg_instanceof_DomException_aafa436ce5fecc64 = function(arg02) {
        let result;
        try {
          result = arg02 instanceof DOMException;
        } catch (_) {
          result = false;
        }
        const ret2 = result;
        return ret2;
      };
      imports.wbg.__wbg_instanceof_HtmlCanvasElement_f764441ef5ddb63f = function(arg02) {
        let result;
        try {
          result = arg02 instanceof HTMLCanvasElement;
        } catch (_) {
          result = false;
        }
        const ret2 = result;
        return ret2;
      };
      imports.wbg.__wbg_instanceof_Response_d3453657e10c4300 = function(arg02) {
        let result;
        try {
          result = arg02 instanceof Response;
        } catch (_) {
          result = false;
        }
        const ret2 = result;
        return ret2;
      };
      imports.wbg.__wbg_instanceof_WebGl2RenderingContext_ed03a40cd6d9a6c5 = function(arg02) {
        let result;
        try {
          result = arg02 instanceof WebGL2RenderingContext;
        } catch (_) {
          result = false;
        }
        const ret2 = result;
        return ret2;
      };
      imports.wbg.__wbg_instanceof_Window_d2514c6a7ee7ba60 = function(arg02) {
        let result;
        try {
          result = arg02 instanceof Window;
        } catch (_) {
          result = false;
        }
        const ret2 = result;
        return ret2;
      };
      imports.wbg.__wbg_invalidateFramebuffer_63b70d9324ec8998 = function() {
        return handleError(function(arg02, arg12, arg2) {
          arg02.invalidateFramebuffer(arg12 >>> 0, arg2);
        }, arguments);
      };
      imports.wbg.__wbg_isIntersecting_03f2dfd4beb70720 = function(arg02) {
        const ret2 = arg02.isIntersecting;
        return ret2;
      };
      imports.wbg.__wbg_isSecureContext_56a612937252b7c4 = function(arg02) {
        const ret2 = arg02.isSecureContext;
        return ret2;
      };
      imports.wbg.__wbg_is_e442492d1fb7967b = function(arg02, arg12) {
        const ret2 = Object.is(arg02, arg12);
        return ret2;
      };
      imports.wbg.__wbg_key_9a40d4f6defa675b = function(arg02, arg12) {
        const ret2 = arg12.key;
        const ptr1 = passStringToWasm0(ret2, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg02 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg02 + 4 * 0, ptr1, true);
      };
      imports.wbg.__wbg_length_65d1cd11729ced11 = function(arg02) {
        const ret2 = arg02.length;
        return ret2;
      };
      imports.wbg.__wbg_length_d65cf0786bfc5739 = function(arg02) {
        const ret2 = arg02.length;
        return ret2;
      };
      imports.wbg.__wbg_linkProgram_9b1029885a37b70d = function(arg02, arg12) {
        arg02.linkProgram(arg12);
      };
      imports.wbg.__wbg_linkProgram_bcf6286423b25b5c = function(arg02, arg12) {
        arg02.linkProgram(arg12);
      };
      imports.wbg.__wbg_location_0d3ce589878cba8a = function(arg02) {
        const ret2 = arg02.location;
        return ret2;
      };
      imports.wbg.__wbg_log_0cc1b7768397bcfe = function(arg02, arg12, arg2, arg3, arg4, arg5, arg6, arg7) {
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
      imports.wbg.__wbg_log_cb9e190acc5753fb = function(arg02, arg12) {
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
      imports.wbg.__wbg_mapping_95e5c8da16bcf133 = function(arg02) {
        const ret2 = arg02.mapping;
        return (__wbindgen_enum_GamepadMappingType.indexOf(ret2) + 1 || 3) - 1;
      };
      imports.wbg.__wbg_mark_7438147ce31e9d4b = function(arg02, arg12) {
        performance.mark(getStringFromWasm0(arg02, arg12));
      };
      imports.wbg.__wbg_matchMedia_4adca948756a5784 = function() {
        return handleError(function(arg02, arg12, arg2) {
          const ret2 = arg02.matchMedia(getStringFromWasm0(arg12, arg2));
          return isLikeNone(ret2) ? 0 : addToExternrefTable0(ret2);
        }, arguments);
      };
      imports.wbg.__wbg_matches_a69a36077c4f07ad = function(arg02) {
        const ret2 = arg02.matches;
        return ret2;
      };
      imports.wbg.__wbg_maxChannelCount_66dd2366c7432e92 = function(arg02) {
        const ret2 = arg02.maxChannelCount;
        return ret2;
      };
      imports.wbg.__wbg_measure_fb7825c11612c823 = function() {
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
      imports.wbg.__wbg_media_276296e08383c7dc = function(arg02, arg12) {
        const ret2 = arg12.media;
        const ptr1 = passStringToWasm0(ret2, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg02 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg02 + 4 * 0, ptr1, true);
      };
      imports.wbg.__wbg_message_d19bdb65f0a41cf5 = function(arg02, arg12) {
        const ret2 = arg12.message;
        const ptr1 = passStringToWasm0(ret2, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg02 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg02 + 4 * 0, ptr1, true);
      };
      imports.wbg.__wbg_metaKey_90fbd812345a7e0c = function(arg02) {
        const ret2 = arg02.metaKey;
        return ret2;
      };
      imports.wbg.__wbg_metaKey_de1f08a4d1e84bd1 = function(arg02) {
        const ret2 = arg02.metaKey;
        return ret2;
      };
      imports.wbg.__wbg_movementX_2e17c283b7c8114b = function(arg02) {
        const ret2 = arg02.movementX;
        return ret2;
      };
      imports.wbg.__wbg_movementY_311d0d64dcbbb4a1 = function(arg02) {
        const ret2 = arg02.movementY;
        return ret2;
      };
      imports.wbg.__wbg_msCrypto_0a36e2ec3a343d26 = function(arg02) {
        const ret2 = arg02.msCrypto;
        return ret2;
      };
      imports.wbg.__wbg_navigator_0fe968937104eaa7 = function(arg02) {
        const ret2 = arg02.navigator;
        return ret2;
      };
      imports.wbg.__wbg_new_0565c3001775c60a = function() {
        return handleError(function(arg02) {
          const ret2 = new ResizeObserver(arg02);
          return ret2;
        }, arguments);
      };
      imports.wbg.__wbg_new_254fa9eac11932ae = function() {
        const ret2 = new Array();
        return ret2;
      };
      imports.wbg.__wbg_new_37eac52f406c308d = function(arg02, arg12, arg2, arg3) {
        const ret2 = new RegExp(getStringFromWasm0(arg02, arg12), getStringFromWasm0(arg2, arg3));
        return ret2;
      };
      imports.wbg.__wbg_new_3d662e5b2b6548c5 = function() {
        return handleError(function(arg02, arg12) {
          const ret2 = new Worker(getStringFromWasm0(arg02, arg12));
          return ret2;
        }, arguments);
      };
      imports.wbg.__wbg_new_3ff5b33b1ce712df = function(arg02) {
        const ret2 = new Uint8Array(arg02);
        return ret2;
      };
      imports.wbg.__wbg_new_463f1efab237d7e0 = function() {
        return handleError(function(arg02) {
          const ret2 = new IntersectionObserver(arg02);
          return ret2;
        }, arguments);
      };
      imports.wbg.__wbg_new_5f48f21d4be11586 = function() {
        return handleError(function() {
          const ret2 = new AbortController();
          return ret2;
        }, arguments);
      };
      imports.wbg.__wbg_new_688846f374351c92 = function() {
        const ret2 = new Object();
        return ret2;
      };
      imports.wbg.__wbg_new_8a6f238a6ece86ea = function() {
        const ret2 = new Error();
        return ret2;
      };
      imports.wbg.__wbg_new_f099e287c6799c7c = function() {
        return handleError(function() {
          const ret2 = new MessageChannel();
          return ret2;
        }, arguments);
      };
      imports.wbg.__wbg_newnoargs_fd9e4bf8be2bc16d = function(arg02, arg12) {
        const ret2 = new Function(getStringFromWasm0(arg02, arg12));
        return ret2;
      };
      imports.wbg.__wbg_newwithbyteoffsetandlength_4b01f207bed23fc0 = function(arg02, arg12, arg2) {
        const ret2 = new Int8Array(arg02, arg12 >>> 0, arg2 >>> 0);
        return ret2;
      };
      imports.wbg.__wbg_newwithbyteoffsetandlength_5910bdf845a168eb = function(arg02, arg12, arg2) {
        const ret2 = new Uint32Array(arg02, arg12 >>> 0, arg2 >>> 0);
        return ret2;
      };
      imports.wbg.__wbg_newwithbyteoffsetandlength_6991ab0478cc4a43 = function(arg02, arg12, arg2) {
        const ret2 = new Int32Array(arg02, arg12 >>> 0, arg2 >>> 0);
        return ret2;
      };
      imports.wbg.__wbg_newwithbyteoffsetandlength_69ec77b20853ae02 = function(arg02, arg12, arg2) {
        const ret2 = new Uint16Array(arg02, arg12 >>> 0, arg2 >>> 0);
        return ret2;
      };
      imports.wbg.__wbg_newwithbyteoffsetandlength_b0192e1adfca2df1 = function(arg02, arg12, arg2) {
        const ret2 = new Int16Array(arg02, arg12 >>> 0, arg2 >>> 0);
        return ret2;
      };
      imports.wbg.__wbg_newwithbyteoffsetandlength_ba35896968751d91 = function(arg02, arg12, arg2) {
        const ret2 = new Uint8Array(arg02, arg12 >>> 0, arg2 >>> 0);
        return ret2;
      };
      imports.wbg.__wbg_newwithbyteoffsetandlength_f113a96374814bb2 = function(arg02, arg12, arg2) {
        const ret2 = new Float32Array(arg02, arg12 >>> 0, arg2 >>> 0);
        return ret2;
      };
      imports.wbg.__wbg_newwithcontextoptions_650227aa16d5f30e = function() {
        return handleError(function(arg02) {
          const ret2 = new lAudioContext(arg02);
          return ret2;
        }, arguments);
      };
      imports.wbg.__wbg_newwithlength_34ce8f1051e74449 = function(arg02) {
        const ret2 = new Uint8Array(arg02 >>> 0);
        return ret2;
      };
      imports.wbg.__wbg_newwithstrsequenceandoptions_c12c1efe3dd90e2c = function() {
        return handleError(function(arg02, arg12) {
          const ret2 = new Blob(arg02, arg12);
          return ret2;
        }, arguments);
      };
      imports.wbg.__wbg_node_02999533c4ea02e3 = function(arg02) {
        const ret2 = arg02.node;
        return ret2;
      };
      imports.wbg.__wbg_now_2c95c9de01293173 = function(arg02) {
        const ret2 = arg02.now();
        return ret2;
      };
      imports.wbg.__wbg_now_64d0bb151e5d3889 = function() {
        const ret2 = Date.now();
        return ret2;
      };
      imports.wbg.__wbg_observe_4312463ceec4f579 = function(arg02, arg12) {
        arg02.observe(arg12);
      };
      imports.wbg.__wbg_observe_5777bdcf09e4bdde = function(arg02, arg12) {
        arg02.observe(arg12);
      };
      imports.wbg.__wbg_observe_71a44d88a2880088 = function(arg02, arg12, arg2) {
        arg02.observe(arg12, arg2);
      };
      imports.wbg.__wbg_of_437cdae2760f8b94 = function(arg02, arg12) {
        const ret2 = Array.of(arg02, arg12);
        return ret2;
      };
      imports.wbg.__wbg_of_924412d32367b13d = function(arg02) {
        const ret2 = Array.of(arg02);
        return ret2;
      };
      imports.wbg.__wbg_offsetX_d6957d052a0d4b11 = function(arg02) {
        const ret2 = arg02.offsetX;
        return ret2;
      };
      imports.wbg.__wbg_offsetY_076edde514bf80f4 = function(arg02) {
        const ret2 = arg02.offsetY;
        return ret2;
      };
      imports.wbg.__wbg_open_94e1e54493f5c069 = function() {
        return handleError(function(arg02, arg12, arg2, arg3, arg4) {
          const ret2 = arg02.open(getStringFromWasm0(arg12, arg2), getStringFromWasm0(arg3, arg4));
          return isLikeNone(ret2) ? 0 : addToExternrefTable0(ret2);
        }, arguments);
      };
      imports.wbg.__wbg_performance_7a3ffd0b17f663ad = function(arg02) {
        const ret2 = arg02.performance;
        return ret2;
      };
      imports.wbg.__wbg_persisted_fa8c29c59197f243 = function(arg02) {
        const ret2 = arg02.persisted;
        return ret2;
      };
      imports.wbg.__wbg_pixelStorei_7c93ee0ad7bf0763 = function(arg02, arg12, arg2) {
        arg02.pixelStorei(arg12 >>> 0, arg2);
      };
      imports.wbg.__wbg_pixelStorei_7dc331e4d85de1a3 = function(arg02, arg12, arg2) {
        arg02.pixelStorei(arg12 >>> 0, arg2);
      };
      imports.wbg.__wbg_play_e7eb90a843114e0d = function(arg02) {
        arg02.play();
      };
      imports.wbg.__wbg_pointerId_85845d98372f1198 = function(arg02) {
        const ret2 = arg02.pointerId;
        return ret2;
      };
      imports.wbg.__wbg_pointerType_4d6a147d076e7aae = function(arg02, arg12) {
        const ret2 = arg12.pointerType;
        const ptr1 = passStringToWasm0(ret2, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg02 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg02 + 4 * 0, ptr1, true);
      };
      imports.wbg.__wbg_polygonOffset_c1f6f426b41cadfa = function(arg02, arg12, arg2) {
        arg02.polygonOffset(arg12, arg2);
      };
      imports.wbg.__wbg_polygonOffset_f5ca18abb10c57c1 = function(arg02, arg12, arg2) {
        arg02.polygonOffset(arg12, arg2);
      };
      imports.wbg.__wbg_port1_bda6bd389f4cc28a = function(arg02) {
        const ret2 = arg02.port1;
        return ret2;
      };
      imports.wbg.__wbg_port2_b250432baff0d94d = function(arg02) {
        const ret2 = arg02.port2;
        return ret2;
      };
      imports.wbg.__wbg_postMessage_586e33893b92051e = function() {
        return handleError(function(arg02, arg12, arg2) {
          arg02.postMessage(arg12, arg2);
        }, arguments);
      };
      imports.wbg.__wbg_postMessage_73c83cb8c6103c58 = function() {
        return handleError(function(arg02, arg12) {
          arg02.postMessage(arg12);
        }, arguments);
      };
      imports.wbg.__wbg_postTask_9ba4c3cedae00b38 = function(arg02, arg12, arg2) {
        const ret2 = arg02.postTask(arg12, arg2);
        return ret2;
      };
      imports.wbg.__wbg_pressed_6ce8b91e53f226e3 = function(arg02) {
        const ret2 = arg02.pressed;
        return ret2;
      };
      imports.wbg.__wbg_pressure_c345c07c94ad38cf = function(arg02) {
        const ret2 = arg02.pressure;
        return ret2;
      };
      imports.wbg.__wbg_preventDefault_3c86e59772d015e6 = function(arg02) {
        arg02.preventDefault();
      };
      imports.wbg.__wbg_process_5c1d670bc53614b8 = function(arg02) {
        const ret2 = arg02.process;
        return ret2;
      };
      imports.wbg.__wbg_prototype_0f68911d93450df4 = function() {
        const ret2 = ResizeObserverEntry.prototype;
        return ret2;
      };
      imports.wbg.__wbg_push_6edad0df4b546b2c = function(arg02, arg12) {
        const ret2 = arg02.push(arg12);
        return ret2;
      };
      imports.wbg.__wbg_querySelector_7b4362006fdeda68 = function() {
        return handleError(function(arg02, arg12, arg2) {
          const ret2 = arg02.querySelector(getStringFromWasm0(arg12, arg2));
          return isLikeNone(ret2) ? 0 : addToExternrefTable0(ret2);
        }, arguments);
      };
      imports.wbg.__wbg_queueMicrotask_2181040e064c0dc8 = function(arg02) {
        queueMicrotask(arg02);
      };
      imports.wbg.__wbg_queueMicrotask_5fc3e400ac3c03f4 = function(arg02) {
        queueMicrotask(arg02);
      };
      imports.wbg.__wbg_queueMicrotask_ef9ac43769cbcc4f = function(arg02) {
        const ret2 = arg02.queueMicrotask;
        return ret2;
      };
      imports.wbg.__wbg_randomFillSync_ab2cfe79ebbf2740 = function() {
        return handleError(function(arg02, arg12) {
          arg02.randomFillSync(arg12);
        }, arguments);
      };
      imports.wbg.__wbg_readBuffer_653369542808a3f9 = function(arg02, arg12) {
        arg02.readBuffer(arg12 >>> 0);
      };
      imports.wbg.__wbg_readPixels_33f7af7601585ec6 = function() {
        return handleError(function(arg02, arg12, arg2, arg3, arg4, arg5, arg6, arg7) {
          arg02.readPixels(arg12, arg2, arg3, arg4, arg5 >>> 0, arg6 >>> 0, arg7);
        }, arguments);
      };
      imports.wbg.__wbg_readPixels_bc526324b691316a = function() {
        return handleError(function(arg02, arg12, arg2, arg3, arg4, arg5, arg6, arg7) {
          arg02.readPixels(arg12, arg2, arg3, arg4, arg5 >>> 0, arg6 >>> 0, arg7);
        }, arguments);
      };
      imports.wbg.__wbg_readPixels_ca434c18552fc5bc = function() {
        return handleError(function(arg02, arg12, arg2, arg3, arg4, arg5, arg6, arg7) {
          arg02.readPixels(arg12, arg2, arg3, arg4, arg5 >>> 0, arg6 >>> 0, arg7);
        }, arguments);
      };
      imports.wbg.__wbg_removeEventListener_a9ca9f05245321f0 = function() {
        return handleError(function(arg02, arg12, arg2, arg3) {
          arg02.removeEventListener(getStringFromWasm0(arg12, arg2), arg3);
        }, arguments);
      };
      imports.wbg.__wbg_removeListener_00f6b4d348de1d99 = function() {
        return handleError(function(arg02, arg12) {
          arg02.removeListener(arg12);
        }, arguments);
      };
      imports.wbg.__wbg_removeProperty_ac500eb39cba5510 = function() {
        return handleError(function(arg02, arg12, arg2, arg3) {
          const ret2 = arg12.removeProperty(getStringFromWasm0(arg2, arg3));
          const ptr1 = passStringToWasm0(ret2, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
          const len1 = WASM_VECTOR_LEN;
          getDataViewMemory0().setInt32(arg02 + 4 * 1, len1, true);
          getDataViewMemory0().setInt32(arg02 + 4 * 0, ptr1, true);
        }, arguments);
      };
      imports.wbg.__wbg_renderbufferStorageMultisample_91b450830ec884b1 = function(arg02, arg12, arg2, arg3, arg4, arg5) {
        arg02.renderbufferStorageMultisample(arg12 >>> 0, arg2, arg3 >>> 0, arg4, arg5);
      };
      imports.wbg.__wbg_renderbufferStorage_b430ea871e926e62 = function(arg02, arg12, arg2, arg3, arg4) {
        arg02.renderbufferStorage(arg12 >>> 0, arg2 >>> 0, arg3, arg4);
      };
      imports.wbg.__wbg_renderbufferStorage_c27160e39f974d56 = function(arg02, arg12, arg2, arg3, arg4) {
        arg02.renderbufferStorage(arg12 >>> 0, arg2 >>> 0, arg3, arg4);
      };
      imports.wbg.__wbg_repeat_621b3806d8c52204 = function(arg02) {
        const ret2 = arg02.repeat;
        return ret2;
      };
      imports.wbg.__wbg_requestAnimationFrame_169cbbda5861d9ca = function() {
        return handleError(function(arg02, arg12) {
          const ret2 = arg02.requestAnimationFrame(arg12);
          return ret2;
        }, arguments);
      };
      imports.wbg.__wbg_requestFullscreen_e1ad8752a4e33f7e = function(arg02) {
        const ret2 = arg02.requestFullscreen;
        return ret2;
      };
      imports.wbg.__wbg_requestFullscreen_f727b1f250ebb10a = function(arg02) {
        const ret2 = arg02.requestFullscreen();
        return ret2;
      };
      imports.wbg.__wbg_requestIdleCallback_6520e3e96167e941 = function() {
        return handleError(function(arg02, arg12) {
          const ret2 = arg02.requestIdleCallback(arg12);
          return ret2;
        }, arguments);
      };
      imports.wbg.__wbg_requestIdleCallback_773c554fc8c5a310 = function(arg02) {
        const ret2 = arg02.requestIdleCallback;
        return ret2;
      };
      imports.wbg.__wbg_requestPointerLock_424ca2a6bd3e5542 = function(arg02) {
        arg02.requestPointerLock();
      };
      imports.wbg.__wbg_require_79b1e9274cde3c87 = function() {
        return handleError(function() {
          const ret2 = module.require;
          return ret2;
        }, arguments);
      };
      imports.wbg.__wbg_resolve_0bf7c44d641804f9 = function(arg02) {
        const ret2 = Promise.resolve(arg02);
        return ret2;
      };
      imports.wbg.__wbg_resume_fa7be90350810c5a = function() {
        return handleError(function(arg02) {
          const ret2 = arg02.resume();
          return ret2;
        }, arguments);
      };
      imports.wbg.__wbg_revokeObjectURL_efa90403a85af243 = function() {
        return handleError(function(arg02, arg12) {
          URL.revokeObjectURL(getStringFromWasm0(arg02, arg12));
        }, arguments);
      };
      imports.wbg.__wbg_samplerParameterf_f3b6e5ca86890729 = function(arg02, arg12, arg2, arg3) {
        arg02.samplerParameterf(arg12, arg2 >>> 0, arg3);
      };
      imports.wbg.__wbg_samplerParameteri_d83a25b6c51618f2 = function(arg02, arg12, arg2, arg3) {
        arg02.samplerParameteri(arg12, arg2 >>> 0, arg3);
      };
      imports.wbg.__wbg_scheduler_10edeee35a76c7c6 = function(arg02) {
        const ret2 = arg02.scheduler;
        return ret2;
      };
      imports.wbg.__wbg_scheduler_6d71128f17fbca34 = function(arg02) {
        const ret2 = arg02.scheduler;
        return ret2;
      };
      imports.wbg.__wbg_scissor_63c22bd552b53b16 = function(arg02, arg12, arg2, arg3, arg4) {
        arg02.scissor(arg12, arg2, arg3, arg4);
      };
      imports.wbg.__wbg_scissor_eebb3b755c95ca32 = function(arg02, arg12, arg2, arg3, arg4) {
        arg02.scissor(arg12, arg2, arg3, arg4);
      };
      imports.wbg.__wbg_setAttribute_148e0e65e20e5f27 = function() {
        return handleError(function(arg02, arg12, arg2, arg3, arg4) {
          arg02.setAttribute(getStringFromWasm0(arg12, arg2), getStringFromWasm0(arg3, arg4));
        }, arguments);
      };
      imports.wbg.__wbg_setPointerCapture_e566a9828fac9a43 = function() {
        return handleError(function(arg02, arg12) {
          arg02.setPointerCapture(arg12);
        }, arguments);
      };
      imports.wbg.__wbg_setProperty_0eb9705cf1b05650 = function() {
        return handleError(function(arg02, arg12, arg2, arg3, arg4) {
          arg02.setProperty(getStringFromWasm0(arg12, arg2), getStringFromWasm0(arg3, arg4));
        }, arguments);
      };
      imports.wbg.__wbg_setTimeout_8d2afdcdb34b4e5a = function() {
        return handleError(function(arg02, arg12, arg2) {
          const ret2 = arg02.setTimeout(arg12, arg2);
          return ret2;
        }, arguments);
      };
      imports.wbg.__wbg_setTimeout_e60aa33ae1e92d5a = function() {
        return handleError(function(arg02, arg12) {
          const ret2 = arg02.setTimeout(arg12);
          return ret2;
        }, arguments);
      };
      imports.wbg.__wbg_set_23d69db4e5c66a6e = function(arg02, arg12, arg2) {
        arg02.set(arg12, arg2 >>> 0);
      };
      imports.wbg.__wbg_set_4e647025551483bd = function() {
        return handleError(function(arg02, arg12, arg2) {
          const ret2 = Reflect.set(arg02, arg12, arg2);
          return ret2;
        }, arguments);
      };
      imports.wbg.__wbg_setbox_2c55cd020a2888a8 = function(arg02, arg12) {
        arg02.box = __wbindgen_enum_ResizeObserverBoxOptions[arg12];
      };
      imports.wbg.__wbg_setbuffer_94908cf7eea525e9 = function(arg02, arg12) {
        arg02.buffer = arg12;
      };
      imports.wbg.__wbg_setchannelCount_089f29a4056f0730 = function(arg02, arg12) {
        arg02.channelCount = arg12 >>> 0;
      };
      imports.wbg.__wbg_setheight_16d76e7fa9d506ea = function(arg02, arg12) {
        arg02.height = arg12 >>> 0;
      };
      imports.wbg.__wbg_setheight_9805cc527c3e4d65 = function(arg02, arg12) {
        arg02.height = arg12 >>> 0;
      };
      imports.wbg.__wbg_setonended_42d712d61e631fd6 = function(arg02, arg12) {
        arg02.onended = arg12;
      };
      imports.wbg.__wbg_setonmessage_4e389f08c5e3d852 = function(arg02, arg12) {
        arg02.onmessage = arg12;
      };
      imports.wbg.__wbg_setsamplerate_aafb90591adbc778 = function(arg02, arg12) {
        arg02.sampleRate = arg12;
      };
      imports.wbg.__wbg_settype_fd39465d237c2f36 = function(arg02, arg12, arg2) {
        arg02.type = getStringFromWasm0(arg12, arg2);
      };
      imports.wbg.__wbg_setwidth_4afeb01eae9784dd = function(arg02, arg12) {
        arg02.width = arg12 >>> 0;
      };
      imports.wbg.__wbg_setwidth_c588fe07a7982aca = function(arg02, arg12) {
        arg02.width = arg12 >>> 0;
      };
      imports.wbg.__wbg_shaderSource_3bbf44221529c149 = function(arg02, arg12, arg2, arg3) {
        arg02.shaderSource(arg12, getStringFromWasm0(arg2, arg3));
      };
      imports.wbg.__wbg_shaderSource_6a657afd48edb05a = function(arg02, arg12, arg2, arg3) {
        arg02.shaderSource(arg12, getStringFromWasm0(arg2, arg3));
      };
      imports.wbg.__wbg_shiftKey_0d6625838238aee8 = function(arg02) {
        const ret2 = arg02.shiftKey;
        return ret2;
      };
      imports.wbg.__wbg_shiftKey_4b30f68655b97001 = function(arg02) {
        const ret2 = arg02.shiftKey;
        return ret2;
      };
      imports.wbg.__wbg_signal_1fdadeba2d04660e = function(arg02) {
        const ret2 = arg02.signal;
        return ret2;
      };
      imports.wbg.__wbg_stack_0ed75d68575b0f3c = function(arg02, arg12) {
        const ret2 = arg12.stack;
        const ptr1 = passStringToWasm0(ret2, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg02 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg02 + 4 * 0, ptr1, true);
      };
      imports.wbg.__wbg_start_468bfa26bc34cd1c = function() {
        return handleError(function(arg02, arg12) {
          arg02.start(arg12);
        }, arguments);
      };
      imports.wbg.__wbg_start_4c1bf0eed2ea2a6c = function(arg02) {
        arg02.start();
      };
      imports.wbg.__wbg_static_accessor_GLOBAL_0be7472e492ad3e3 = function() {
        const ret2 = typeof global === "undefined" ? null : global;
        return isLikeNone(ret2) ? 0 : addToExternrefTable0(ret2);
      };
      imports.wbg.__wbg_static_accessor_GLOBAL_THIS_1a6eb482d12c9bfb = function() {
        const ret2 = typeof globalThis === "undefined" ? null : globalThis;
        return isLikeNone(ret2) ? 0 : addToExternrefTable0(ret2);
      };
      imports.wbg.__wbg_static_accessor_SELF_1dc398a895c82351 = function() {
        const ret2 = typeof self === "undefined" ? null : self;
        return isLikeNone(ret2) ? 0 : addToExternrefTable0(ret2);
      };
      imports.wbg.__wbg_static_accessor_WINDOW_ae1c80c7eea8d64a = function() {
        const ret2 = typeof window === "undefined" ? null : window;
        return isLikeNone(ret2) ? 0 : addToExternrefTable0(ret2);
      };
      imports.wbg.__wbg_status_317f53bc4c7638df = function(arg02) {
        const ret2 = arg02.status;
        return ret2;
      };
      imports.wbg.__wbg_stencilFuncSeparate_0e2669752fe61623 = function(arg02, arg12, arg2, arg3, arg4) {
        arg02.stencilFuncSeparate(arg12 >>> 0, arg2 >>> 0, arg3, arg4 >>> 0);
      };
      imports.wbg.__wbg_stencilFuncSeparate_8a3cf59c6b451cdb = function(arg02, arg12, arg2, arg3, arg4) {
        arg02.stencilFuncSeparate(arg12 >>> 0, arg2 >>> 0, arg3, arg4 >>> 0);
      };
      imports.wbg.__wbg_stencilMaskSeparate_944fdaf4c6c085dd = function(arg02, arg12, arg2) {
        arg02.stencilMaskSeparate(arg12 >>> 0, arg2 >>> 0);
      };
      imports.wbg.__wbg_stencilMaskSeparate_b32b2d3f4d6dd883 = function(arg02, arg12, arg2) {
        arg02.stencilMaskSeparate(arg12 >>> 0, arg2 >>> 0);
      };
      imports.wbg.__wbg_stencilMask_2d4c5cbf29531171 = function(arg02, arg12) {
        arg02.stencilMask(arg12 >>> 0);
      };
      imports.wbg.__wbg_stencilMask_b4a3bc52ac8b45a2 = function(arg02, arg12) {
        arg02.stencilMask(arg12 >>> 0);
      };
      imports.wbg.__wbg_stencilOpSeparate_461b7b63a06d8eab = function(arg02, arg12, arg2, arg3, arg4) {
        arg02.stencilOpSeparate(arg12 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
      };
      imports.wbg.__wbg_stencilOpSeparate_fb97013a4a7e676b = function(arg02, arg12, arg2, arg3, arg4) {
        arg02.stencilOpSeparate(arg12 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
      };
      imports.wbg.__wbg_stringify_f4f701bc34ceda61 = function() {
        return handleError(function(arg02) {
          const ret2 = JSON.stringify(arg02);
          return ret2;
        }, arguments);
      };
      imports.wbg.__wbg_style_53bb2d762dd1c030 = function(arg02) {
        const ret2 = arg02.style;
        return ret2;
      };
      imports.wbg.__wbg_subarray_46adeb9b86949d12 = function(arg02, arg12, arg2) {
        const ret2 = arg02.subarray(arg12 >>> 0, arg2 >>> 0);
        return ret2;
      };
      imports.wbg.__wbg_texImage2D_488bd0838560f2fd = function() {
        return handleError(function(arg02, arg12, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
          arg02.texImage2D(arg12 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
        }, arguments);
      };
      imports.wbg.__wbg_texImage2D_d83566263a20c144 = function() {
        return handleError(function(arg02, arg12, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
          arg02.texImage2D(arg12 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
        }, arguments);
      };
      imports.wbg.__wbg_texImage3D_435fd88660b60b3b = function() {
        return handleError(function(arg02, arg12, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
          arg02.texImage3D(arg12 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8 >>> 0, arg9 >>> 0, arg10);
        }, arguments);
      };
      imports.wbg.__wbg_texParameteri_45603287be57d25e = function(arg02, arg12, arg2, arg3) {
        arg02.texParameteri(arg12 >>> 0, arg2 >>> 0, arg3);
      };
      imports.wbg.__wbg_texParameteri_d550886a76f21258 = function(arg02, arg12, arg2, arg3) {
        arg02.texParameteri(arg12 >>> 0, arg2 >>> 0, arg3);
      };
      imports.wbg.__wbg_texStorage2D_cde5cb7abf420f39 = function(arg02, arg12, arg2, arg3, arg4, arg5) {
        arg02.texStorage2D(arg12 >>> 0, arg2, arg3 >>> 0, arg4, arg5);
      };
      imports.wbg.__wbg_texStorage3D_fc26ec90a9bea55a = function(arg02, arg12, arg2, arg3, arg4, arg5, arg6) {
        arg02.texStorage3D(arg12 >>> 0, arg2, arg3 >>> 0, arg4, arg5, arg6);
      };
      imports.wbg.__wbg_texSubImage2D_0eeb9856a37cc769 = function() {
        return handleError(function(arg02, arg12, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
          arg02.texSubImage2D(arg12 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
        }, arguments);
      };
      imports.wbg.__wbg_texSubImage2D_355ed8d7c2b07c22 = function() {
        return handleError(function(arg02, arg12, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
          arg02.texSubImage2D(arg12 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
        }, arguments);
      };
      imports.wbg.__wbg_texSubImage2D_4a61cebe672fb075 = function() {
        return handleError(function(arg02, arg12, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
          arg02.texSubImage2D(arg12 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
        }, arguments);
      };
      imports.wbg.__wbg_texSubImage2D_728af2502d3d5705 = function() {
        return handleError(function(arg02, arg12, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
          arg02.texSubImage2D(arg12 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
        }, arguments);
      };
      imports.wbg.__wbg_texSubImage2D_7af37da149ecfb8e = function() {
        return handleError(function(arg02, arg12, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
          arg02.texSubImage2D(arg12 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
        }, arguments);
      };
      imports.wbg.__wbg_texSubImage2D_e7625a06d35850ee = function() {
        return handleError(function(arg02, arg12, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
          arg02.texSubImage2D(arg12 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
        }, arguments);
      };
      imports.wbg.__wbg_texSubImage3D_5f69a7b6a6cfee4d = function() {
        return handleError(function(arg02, arg12, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
          arg02.texSubImage3D(arg12 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0, arg11);
        }, arguments);
      };
      imports.wbg.__wbg_texSubImage3D_bbfb28b10d74c5fb = function() {
        return handleError(function(arg02, arg12, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
          arg02.texSubImage3D(arg12 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0, arg11);
        }, arguments);
      };
      imports.wbg.__wbg_texSubImage3D_d877836539c045af = function() {
        return handleError(function(arg02, arg12, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
          arg02.texSubImage3D(arg12 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0, arg11);
        }, arguments);
      };
      imports.wbg.__wbg_texSubImage3D_e99dc83a4bef4f03 = function() {
        return handleError(function(arg02, arg12, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
          arg02.texSubImage3D(arg12 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0, arg11);
        }, arguments);
      };
      imports.wbg.__wbg_texSubImage3D_f04486ebbf40ab5e = function() {
        return handleError(function(arg02, arg12, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
          arg02.texSubImage3D(arg12 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0, arg11);
        }, arguments);
      };
      imports.wbg.__wbg_then_0438fad860fe38e1 = function(arg02, arg12) {
        const ret2 = arg02.then(arg12);
        return ret2;
      };
      imports.wbg.__wbg_then_0ffafeddf0e182a4 = function(arg02, arg12, arg2) {
        const ret2 = arg02.then(arg12, arg2);
        return ret2;
      };
      imports.wbg.__wbg_uniform1f_355e1f6a61fccb63 = function(arg02, arg12, arg2) {
        arg02.uniform1f(arg12, arg2);
      };
      imports.wbg.__wbg_uniform1f_a8765c5b2bedff99 = function(arg02, arg12, arg2) {
        arg02.uniform1f(arg12, arg2);
      };
      imports.wbg.__wbg_uniform1i_33a6ced29e8c7297 = function(arg02, arg12, arg2) {
        arg02.uniform1i(arg12, arg2);
      };
      imports.wbg.__wbg_uniform1i_fd66f39a37e6a753 = function(arg02, arg12, arg2) {
        arg02.uniform1i(arg12, arg2);
      };
      imports.wbg.__wbg_uniform1ui_70fbafc7c7c2a824 = function(arg02, arg12, arg2) {
        arg02.uniform1ui(arg12, arg2 >>> 0);
      };
      imports.wbg.__wbg_uniform2fv_4656b178cf5fa4c1 = function(arg02, arg12, arg2, arg3) {
        arg02.uniform2fv(arg12, getArrayF32FromWasm0(arg2, arg3));
      };
      imports.wbg.__wbg_uniform2fv_f9d9552b515ed3b7 = function(arg02, arg12, arg2, arg3) {
        arg02.uniform2fv(arg12, getArrayF32FromWasm0(arg2, arg3));
      };
      imports.wbg.__wbg_uniform2iv_5da94d37b60378ae = function(arg02, arg12, arg2, arg3) {
        arg02.uniform2iv(arg12, getArrayI32FromWasm0(arg2, arg3));
      };
      imports.wbg.__wbg_uniform2iv_8d2d21a55cd6e1b5 = function(arg02, arg12, arg2, arg3) {
        arg02.uniform2iv(arg12, getArrayI32FromWasm0(arg2, arg3));
      };
      imports.wbg.__wbg_uniform2uiv_d656dde7098ac0e9 = function(arg02, arg12, arg2, arg3) {
        arg02.uniform2uiv(arg12, getArrayU32FromWasm0(arg2, arg3));
      };
      imports.wbg.__wbg_uniform3fv_2e8d4216dfb82f6d = function(arg02, arg12, arg2, arg3) {
        arg02.uniform3fv(arg12, getArrayF32FromWasm0(arg2, arg3));
      };
      imports.wbg.__wbg_uniform3fv_bab07e5c9f85179f = function(arg02, arg12, arg2, arg3) {
        arg02.uniform3fv(arg12, getArrayF32FromWasm0(arg2, arg3));
      };
      imports.wbg.__wbg_uniform3iv_63910fa250afb050 = function(arg02, arg12, arg2, arg3) {
        arg02.uniform3iv(arg12, getArrayI32FromWasm0(arg2, arg3));
      };
      imports.wbg.__wbg_uniform3iv_c163b334e2241b48 = function(arg02, arg12, arg2, arg3) {
        arg02.uniform3iv(arg12, getArrayI32FromWasm0(arg2, arg3));
      };
      imports.wbg.__wbg_uniform3uiv_7dd00d5c57f02ec4 = function(arg02, arg12, arg2, arg3) {
        arg02.uniform3uiv(arg12, getArrayU32FromWasm0(arg2, arg3));
      };
      imports.wbg.__wbg_uniform4f_35db89edde01f72e = function(arg02, arg12, arg2, arg3, arg4, arg5) {
        arg02.uniform4f(arg12, arg2, arg3, arg4, arg5);
      };
      imports.wbg.__wbg_uniform4f_c748f87d2c53a566 = function(arg02, arg12, arg2, arg3, arg4, arg5) {
        arg02.uniform4f(arg12, arg2, arg3, arg4, arg5);
      };
      imports.wbg.__wbg_uniform4fv_be28454f5049854f = function(arg02, arg12, arg2, arg3) {
        arg02.uniform4fv(arg12, getArrayF32FromWasm0(arg2, arg3));
      };
      imports.wbg.__wbg_uniform4fv_f7d3df09330a128e = function(arg02, arg12, arg2, arg3) {
        arg02.uniform4fv(arg12, getArrayF32FromWasm0(arg2, arg3));
      };
      imports.wbg.__wbg_uniform4iv_e811f1e4f059bdc7 = function(arg02, arg12, arg2, arg3) {
        arg02.uniform4iv(arg12, getArrayI32FromWasm0(arg2, arg3));
      };
      imports.wbg.__wbg_uniform4iv_f8579ce3b0f415b3 = function(arg02, arg12, arg2, arg3) {
        arg02.uniform4iv(arg12, getArrayI32FromWasm0(arg2, arg3));
      };
      imports.wbg.__wbg_uniform4uiv_4acafe46bc76dbec = function(arg02, arg12, arg2, arg3) {
        arg02.uniform4uiv(arg12, getArrayU32FromWasm0(arg2, arg3));
      };
      imports.wbg.__wbg_uniformBlockBinding_34be9be50f7c2465 = function(arg02, arg12, arg2, arg3) {
        arg02.uniformBlockBinding(arg12, arg2 >>> 0, arg3 >>> 0);
      };
      imports.wbg.__wbg_uniformMatrix2fv_17cab4f6d3030e4a = function(arg02, arg12, arg2, arg3, arg4) {
        arg02.uniformMatrix2fv(arg12, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
      };
      imports.wbg.__wbg_uniformMatrix2fv_89b5eee6863a8da9 = function(arg02, arg12, arg2, arg3, arg4) {
        arg02.uniformMatrix2fv(arg12, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
      };
      imports.wbg.__wbg_uniformMatrix2x3fv_fa3097acf0ddbdf3 = function(arg02, arg12, arg2, arg3, arg4) {
        arg02.uniformMatrix2x3fv(arg12, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
      };
      imports.wbg.__wbg_uniformMatrix2x4fv_28e0d621c4df6e38 = function(arg02, arg12, arg2, arg3, arg4) {
        arg02.uniformMatrix2x4fv(arg12, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
      };
      imports.wbg.__wbg_uniformMatrix3fv_072dfda2d6a0e388 = function(arg02, arg12, arg2, arg3, arg4) {
        arg02.uniformMatrix3fv(arg12, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
      };
      imports.wbg.__wbg_uniformMatrix3fv_c4d861a040ef1853 = function(arg02, arg12, arg2, arg3, arg4) {
        arg02.uniformMatrix3fv(arg12, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
      };
      imports.wbg.__wbg_uniformMatrix3x2fv_32accfd656e00e8b = function(arg02, arg12, arg2, arg3, arg4) {
        arg02.uniformMatrix3x2fv(arg12, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
      };
      imports.wbg.__wbg_uniformMatrix3x4fv_31763ee28bb4b383 = function(arg02, arg12, arg2, arg3, arg4) {
        arg02.uniformMatrix3x4fv(arg12, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
      };
      imports.wbg.__wbg_uniformMatrix4fv_b684a40949b2ff0b = function(arg02, arg12, arg2, arg3, arg4) {
        arg02.uniformMatrix4fv(arg12, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
      };
      imports.wbg.__wbg_uniformMatrix4fv_fa5c91b7cee9bfd5 = function(arg02, arg12, arg2, arg3, arg4) {
        arg02.uniformMatrix4fv(arg12, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
      };
      imports.wbg.__wbg_uniformMatrix4x2fv_3f1b922cbbe99848 = function(arg02, arg12, arg2, arg3, arg4) {
        arg02.uniformMatrix4x2fv(arg12, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
      };
      imports.wbg.__wbg_uniformMatrix4x3fv_e40b09ea2f26c973 = function(arg02, arg12, arg2, arg3, arg4) {
        arg02.uniformMatrix4x3fv(arg12, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
      };
      imports.wbg.__wbg_unobserve_811e068c4afdf7d8 = function(arg02, arg12) {
        arg02.unobserve(arg12);
      };
      imports.wbg.__wbg_useProgram_1a5a4be134db012a = function(arg02, arg12) {
        arg02.useProgram(arg12);
      };
      imports.wbg.__wbg_useProgram_88e7787408765ccf = function(arg02, arg12) {
        arg02.useProgram(arg12);
      };
      imports.wbg.__wbg_userAgentData_5e600df9bb352050 = function(arg02) {
        const ret2 = arg02.userAgentData;
        return isLikeNone(ret2) ? 0 : addToExternrefTable0(ret2);
      };
      imports.wbg.__wbg_userAgent_918b064b4cd32842 = function() {
        return handleError(function(arg02, arg12) {
          const ret2 = arg12.userAgent;
          const ptr1 = passStringToWasm0(ret2, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
          const len1 = WASM_VECTOR_LEN;
          getDataViewMemory0().setInt32(arg02 + 4 * 1, len1, true);
          getDataViewMemory0().setInt32(arg02 + 4 * 0, ptr1, true);
        }, arguments);
      };
      imports.wbg.__wbg_value_b7364a12af04cfd2 = function(arg02) {
        const ret2 = arg02.value;
        return ret2;
      };
      imports.wbg.__wbg_versions_c71aa1626a93e0a1 = function(arg02) {
        const ret2 = arg02.versions;
        return ret2;
      };
      imports.wbg.__wbg_vertexAttribDivisorANGLE_2712e437f242895b = function(arg02, arg12, arg2) {
        arg02.vertexAttribDivisorANGLE(arg12 >>> 0, arg2 >>> 0);
      };
      imports.wbg.__wbg_vertexAttribDivisor_615c5c0ab239e1af = function(arg02, arg12, arg2) {
        arg02.vertexAttribDivisor(arg12 >>> 0, arg2 >>> 0);
      };
      imports.wbg.__wbg_vertexAttribIPointer_60e25126e1fa4c07 = function(arg02, arg12, arg2, arg3, arg4, arg5) {
        arg02.vertexAttribIPointer(arg12 >>> 0, arg2, arg3 >>> 0, arg4, arg5);
      };
      imports.wbg.__wbg_vertexAttribPointer_1f280ac2d8994592 = function(arg02, arg12, arg2, arg3, arg4, arg5, arg6) {
        arg02.vertexAttribPointer(arg12 >>> 0, arg2, arg3 >>> 0, arg4 !== 0, arg5, arg6);
      };
      imports.wbg.__wbg_vertexAttribPointer_c6b1ccfa43bbca96 = function(arg02, arg12, arg2, arg3, arg4, arg5, arg6) {
        arg02.vertexAttribPointer(arg12 >>> 0, arg2, arg3 >>> 0, arg4 !== 0, arg5, arg6);
      };
      imports.wbg.__wbg_videoHeight_0ccee284b2d0142d = function(arg02) {
        const ret2 = arg02.videoHeight;
        return ret2;
      };
      imports.wbg.__wbg_videoWidth_ddf0b3a73292d990 = function(arg02) {
        const ret2 = arg02.videoWidth;
        return ret2;
      };
      imports.wbg.__wbg_viewport_1ca83fff581a8f22 = function(arg02, arg12, arg2, arg3, arg4) {
        arg02.viewport(arg12, arg2, arg3, arg4);
      };
      imports.wbg.__wbg_viewport_770469a07e2d9772 = function(arg02, arg12, arg2, arg3, arg4) {
        arg02.viewport(arg12, arg2, arg3, arg4);
      };
      imports.wbg.__wbg_visibilityState_77ef9c00e56d5fb4 = function(arg02) {
        const ret2 = arg02.visibilityState;
        return (__wbindgen_enum_VisibilityState.indexOf(ret2) + 1 || 3) - 1;
      };
      imports.wbg.__wbg_webkitExitFullscreen_da1f86a19cc44384 = function(arg02) {
        arg02.webkitExitFullscreen();
      };
      imports.wbg.__wbg_webkitFullscreenElement_0c4654cdfe6894e5 = function(arg02) {
        const ret2 = arg02.webkitFullscreenElement;
        return isLikeNone(ret2) ? 0 : addToExternrefTable0(ret2);
      };
      imports.wbg.__wbg_webkitRequestFullscreen_fe95241c4f21ea63 = function(arg02) {
        arg02.webkitRequestFullscreen();
      };
      imports.wbg.__wbg_width_03690ab2d2e48459 = function(arg02) {
        const ret2 = arg02.width;
        return ret2;
      };
      imports.wbg.__wbg_width_0d7b0b5ad3c2009f = function(arg02) {
        const ret2 = arg02.width;
        return ret2;
      };
      imports.wbg.__wbg_width_7fe68601c524fd1e = function(arg02) {
        const ret2 = arg02.width;
        return ret2;
      };
      imports.wbg.__wbg_width_9927e6a7adb23d6d = function(arg02) {
        const ret2 = arg02.width;
        return ret2;
      };
      imports.wbg.__wbg_writeText_e65e98e75a2a92b8 = function(arg02, arg12, arg2) {
        const ret2 = arg02.writeText(getStringFromWasm0(arg12, arg2));
        return ret2;
      };
      imports.wbg.__wbg_x_f1a4f46155227ad0 = function(arg02) {
        const ret2 = arg02.x;
        return ret2;
      };
      imports.wbg.__wbg_y_fd817e2108616912 = function(arg02) {
        const ret2 = arg02.y;
        return ret2;
      };
      imports.wbg.__wbindgen_boolean_get = function(arg02) {
        const v = arg02;
        const ret2 = typeof v === "boolean" ? v ? 1 : 0 : 2;
        return ret2;
      };
      imports.wbg.__wbindgen_cb_drop = function(arg02) {
        const obj = arg02.original;
        if (obj.cnt-- == 1) {
          obj.a = 0;
          return true;
        }
        const ret2 = false;
        return ret2;
      };
      imports.wbg.__wbindgen_closure_wrapper113879 = function(arg02, arg12, arg2) {
        const ret2 = makeMutClosure(arg02, arg12, 79021, __wbg_adapter_39);
        return ret2;
      };
      imports.wbg.__wbindgen_closure_wrapper115716 = function(arg02, arg12, arg2) {
        const ret2 = makeMutClosure(arg02, arg12, 79371, __wbg_adapter_42);
        return ret2;
      };
      imports.wbg.__wbindgen_closure_wrapper120457 = function(arg02, arg12, arg2) {
        const ret2 = makeMutClosure(arg02, arg12, 80552, __wbg_adapter_45);
        return ret2;
      };
      imports.wbg.__wbindgen_closure_wrapper120459 = function(arg02, arg12, arg2) {
        const ret2 = makeMutClosure(arg02, arg12, 80552, __wbg_adapter_45);
        return ret2;
      };
      imports.wbg.__wbindgen_closure_wrapper120461 = function(arg02, arg12, arg2) {
        const ret2 = makeMutClosure(arg02, arg12, 80552, __wbg_adapter_45);
        return ret2;
      };
      imports.wbg.__wbindgen_closure_wrapper120463 = function(arg02, arg12, arg2) {
        const ret2 = makeMutClosure(arg02, arg12, 80552, __wbg_adapter_45);
        return ret2;
      };
      imports.wbg.__wbindgen_closure_wrapper120466 = function(arg02, arg12, arg2) {
        const ret2 = makeMutClosure(arg02, arg12, 80552, __wbg_adapter_54);
        return ret2;
      };
      imports.wbg.__wbindgen_closure_wrapper120469 = function(arg02, arg12, arg2) {
        const ret2 = makeMutClosure(arg02, arg12, 80552, __wbg_adapter_45);
        return ret2;
      };
      imports.wbg.__wbindgen_closure_wrapper120478 = function(arg02, arg12, arg2) {
        const ret2 = makeMutClosure(arg02, arg12, 80552, __wbg_adapter_45);
        return ret2;
      };
      imports.wbg.__wbindgen_closure_wrapper120481 = function(arg02, arg12, arg2) {
        const ret2 = makeMutClosure(arg02, arg12, 80552, __wbg_adapter_45);
        return ret2;
      };
      imports.wbg.__wbindgen_closure_wrapper120495 = function(arg02, arg12, arg2) {
        const ret2 = makeMutClosure(arg02, arg12, 80552, __wbg_adapter_63);
        return ret2;
      };
      imports.wbg.__wbindgen_closure_wrapper23210 = function(arg02, arg12, arg2) {
        const ret2 = makeMutClosure(arg02, arg12, 16235, __wbg_adapter_36);
        return ret2;
      };
      imports.wbg.__wbindgen_debug_string = function(arg02, arg12) {
        const ret2 = debugString(arg12);
        const ptr1 = passStringToWasm0(ret2, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg02 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg02 + 4 * 0, ptr1, true);
      };
      imports.wbg.__wbindgen_init_externref_table = function() {
        const table = wasm.__wbindgen_export_1;
        const offset = table.grow(4);
        table.set(0, void 0);
        table.set(offset + 0, void 0);
        table.set(offset + 1, null);
        table.set(offset + 2, true);
        table.set(offset + 3, false);
      };
      imports.wbg.__wbindgen_is_function = function(arg02) {
        const ret2 = typeof arg02 === "function";
        return ret2;
      };
      imports.wbg.__wbindgen_is_null = function(arg02) {
        const ret2 = arg02 === null;
        return ret2;
      };
      imports.wbg.__wbindgen_is_object = function(arg02) {
        const val = arg02;
        const ret2 = typeof val === "object" && val !== null;
        return ret2;
      };
      imports.wbg.__wbindgen_is_string = function(arg02) {
        const ret2 = typeof arg02 === "string";
        return ret2;
      };
      imports.wbg.__wbindgen_is_undefined = function(arg02) {
        const ret2 = arg02 === void 0;
        return ret2;
      };
      imports.wbg.__wbindgen_memory = function() {
        const ret2 = wasm.memory;
        return ret2;
      };
      imports.wbg.__wbindgen_number_get = function(arg02, arg12) {
        const obj = arg12;
        const ret2 = typeof obj === "number" ? obj : void 0;
        getDataViewMemory0().setFloat64(arg02 + 8 * 1, isLikeNone(ret2) ? 0 : ret2, true);
        getDataViewMemory0().setInt32(arg02 + 4 * 0, !isLikeNone(ret2), true);
      };
      imports.wbg.__wbindgen_number_new = function(arg02) {
        const ret2 = arg02;
        return ret2;
      };
      imports.wbg.__wbindgen_string_get = function(arg02, arg12) {
        const obj = arg12;
        const ret2 = typeof obj === "string" ? obj : void 0;
        var ptr1 = isLikeNone(ret2) ? 0 : passStringToWasm0(ret2, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg02 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg02 + 4 * 0, ptr1, true);
      };
      imports.wbg.__wbindgen_string_new = function(arg02, arg12) {
        const ret2 = getStringFromWasm0(arg02, arg12);
        return ret2;
      };
      imports.wbg.__wbindgen_throw = function(arg02, arg12) {
        throw new Error(getStringFromWasm0(arg02, arg12));
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
      __wbg_init().then(() => {
        window.send_device_control_toggle_to_bevy = send_device_control_toggle_to_bevy;
        window.send_device_state_to_bevy = send_device_state_to_bevy;
        console.log("WASM functions are now available globally");
      });
    });
    document.querySelector(".back-home-page").addEventListener("click", () => {
      console.log("stop");
      window.location.reload();
    });
  }
});
export default require_index_9abe453b();
