📦
157876 /QuestServers.js
79860 /QuestServers.js.map
✄
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// frida-builtins:/node-globals.js
var init_node_globals = __esm({
  "frida-builtins:/node-globals.js"() {
  }
});

// QuestServers.ts
var require_QuestServers = __commonJS({
  "QuestServers.ts"(exports) {
    init_node_globals();
    var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
      else
        for (var i = decorators.length - 1; i >= 0; i--)
          if (d = decorators[i])
            r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var Il2Cpp;
    (function(Il2Cpp2) {
      Il2Cpp2.application = {
        /**
         * Gets the data path name of the current application, e.g.
         * `/data/emulated/0/Android/data/com.example.application/files`
         * on Android.
         *
         * **This information is not guaranteed to exist.**
         *
         * ```ts
         * Il2Cpp.perform(() => {
         *     // prints /data/emulated/0/Android/data/com.example.application/files
         *     console.log(Il2Cpp.application.dataPath);
         * });
         * ```
         */
        get dataPath() {
          return unityEngineCall("get_persistentDataPath");
        },
        /**
         * Gets the identifier name of the current application, e.g.
         * `com.example.application` on Android.
         *
         * In case the identifier cannot be retrieved, the main module name is
         * returned instead, which typically is the process name.
         *
         * ```ts
         * Il2Cpp.perform(() => {
         *     // prints com.example.application
         *     console.log(Il2Cpp.application.identifier);
         * });
         * ```
         */
        get identifier() {
          return unityEngineCall("get_identifier") ?? unityEngineCall("get_bundleIdentifier") ?? Process.mainModule.name;
        },
        /**
         * Gets the version name of the current application, e.g. `4.12.8`.
         *
         * In case the version cannot be retrieved, an hash of the IL2CPP
         * module is returned instead.
         *
         * ```ts
         * Il2Cpp.perform(() => {
         *     // prints 4.12.8
         *     console.log(Il2Cpp.application.version);
         * });
         * ```
         */
        get version() {
          return unityEngineCall("get_version") ?? exportsHash(Il2Cpp2.module).toString(16);
        }
      };
      getter(Il2Cpp2, "unityVersion", () => {
        try {
          const unityVersion = Il2Cpp2.$config.unityVersion ?? unityEngineCall("get_unityVersion");
          if (unityVersion != null) {
            return unityVersion;
          }
        } catch (_) {
        }
        const searchPattern = "69 6c 32 63 70 70";
        for (const range of Il2Cpp2.module.enumerateRanges("r--").concat(Process.getRangeByAddress(Il2Cpp2.module.base))) {
          for (let { address } of Memory.scanSync(range.base, range.size, searchPattern)) {
            while (address.readU8() != 0) {
              address = address.sub(1);
            }
            const match = UnityVersion.find(address.add(1).readCString());
            if (match != void 0) {
              return match;
            }
          }
        }
        raise("couldn't determine the Unity version, please specify it manually");
      }, lazy);
      getter(Il2Cpp2, "unityVersionIsBelow201830", () => {
        return UnityVersion.lt(Il2Cpp2.unityVersion, "2018.3.0");
      }, lazy);
      getter(Il2Cpp2, "unityVersionIsBelow202120", () => {
        return UnityVersion.lt(Il2Cpp2.unityVersion, "2021.2.0");
      }, lazy);
      function unityEngineCall(method) {
        const handle = Il2Cpp2.exports.resolveInternalCall(Memory.allocUtf8String("UnityEngine.Application::" + method));
        const nativeFunction = new NativeFunction(handle, "pointer", []);
        return nativeFunction.isNull() ? null : new Il2Cpp2.String(nativeFunction()).asNullable()?.content ?? null;
      }
    })(Il2Cpp || (Il2Cpp = {}));
    var Il2Cpp;
    (function(Il2Cpp2) {
      function boxed(value, type) {
        const mapping = {
          int8: "System.SByte",
          uint8: "System.Byte",
          int16: "System.Int16",
          uint16: "System.UInt16",
          int32: "System.Int32",
          uint32: "System.UInt32",
          int64: "System.Int64",
          uint64: "System.UInt64",
          char: "System.Char",
          intptr: "System.IntPtr",
          uintptr: "System.UIntPtr"
        };
        const className = typeof value == "boolean" ? "System.Boolean" : typeof value == "number" ? mapping[type ?? "int32"] : value instanceof Int64 ? "System.Int64" : value instanceof UInt64 ? "System.UInt64" : value instanceof NativePointer ? mapping[type ?? "intptr"] : raise(`Cannot create boxed primitive using value of type '${typeof value}'`);
        const object = Il2Cpp2.corlib.class(className ?? raise(`Unknown primitive type name '${type}'`)).alloc();
        (object.tryField("m_value") ?? object.tryField("_pointer") ?? raise(`Could not find primitive field in class '${className}'`)).value = value;
        return object;
      }
      Il2Cpp2.boxed = boxed;
    })(Il2Cpp || (Il2Cpp = {}));
    var Il2Cpp;
    (function(Il2Cpp2) {
      Il2Cpp2.$config = {
        moduleName: void 0,
        unityVersion: void 0,
        exports: void 0
      };
    })(Il2Cpp || (Il2Cpp = {}));
    var Il2Cpp;
    (function(Il2Cpp2) {
      function dump(fileName, path) {
        fileName = fileName ?? `${Il2Cpp2.application.identifier}_${Il2Cpp2.application.version}.cs`;
        path = path ?? Il2Cpp2.application.dataPath ?? Process.getCurrentDir();
        createDirectoryRecursively(path);
        const destination = `${path}/${fileName}`;
        const file = new File(destination, "w");
        for (const assembly of Il2Cpp2.domain.assemblies) {
          inform(`dumping ${assembly.name}...`);
          for (const klass of assembly.image.classes) {
            file.write(`${klass}

`);
          }
        }
        file.flush();
        file.close();
        ok(`dump saved to ${destination}`);
        showDeprecationNotice();
      }
      Il2Cpp2.dump = dump;
      function dumpTree(path, ignoreAlreadyExistingDirectory = false) {
        path = path ?? `${Il2Cpp2.application.dataPath ?? Process.getCurrentDir()}/${Il2Cpp2.application.identifier}_${Il2Cpp2.application.version}`;
        if (!ignoreAlreadyExistingDirectory && directoryExists(path)) {
          raise(`directory ${path} already exists - pass ignoreAlreadyExistingDirectory = true to skip this check`);
        }
        for (const assembly of Il2Cpp2.domain.assemblies) {
          inform(`dumping ${assembly.name}...`);
          const destination = `${path}/${assembly.name.replaceAll(".", "/")}.cs`;
          createDirectoryRecursively(destination.substring(0, destination.lastIndexOf("/")));
          const file = new File(destination, "w");
          for (const klass of assembly.image.classes) {
            file.write(`${klass}

`);
          }
          file.flush();
          file.close();
        }
        ok(`dump saved to ${path}`);
        showDeprecationNotice();
      }
      Il2Cpp2.dumpTree = dumpTree;
      function directoryExists(path) {
        return Il2Cpp2.corlib.class("System.IO.Directory").method("Exists").invoke(Il2Cpp2.string(path));
      }
      function createDirectoryRecursively(path) {
        Il2Cpp2.corlib.class("System.IO.Directory").method("CreateDirectory").invoke(Il2Cpp2.string(path));
      }
      function showDeprecationNotice() {
        warn("this api will be removed in a future release, please use `npx frida-il2cpp-bridge dump` instead");
      }
    })(Il2Cpp || (Il2Cpp = {}));
    var Il2Cpp;
    (function(Il2Cpp2) {
      function installExceptionListener(targetThread = "current") {
        const currentThread = Il2Cpp2.exports.threadGetCurrent();
        return Interceptor.attach(Il2Cpp2.module.getExportByName("__cxa_throw"), function(args) {
          if (targetThread == "current" && !Il2Cpp2.exports.threadGetCurrent().equals(currentThread)) {
            return;
          }
          inform(new Il2Cpp2.Object(args[0].readPointer()));
        });
      }
      Il2Cpp2.installExceptionListener = installExceptionListener;
    })(Il2Cpp || (Il2Cpp = {}));
    var Il2Cpp;
    (function(Il2Cpp2) {
      Il2Cpp2.exports = {
        get alloc() {
          return r("il2cpp_alloc", "pointer", ["size_t"]);
        },
        get arrayGetLength() {
          return r("il2cpp_array_length", "uint32", ["pointer"]);
        },
        get arrayNew() {
          return r("il2cpp_array_new", "pointer", ["pointer", "uint32"]);
        },
        get assemblyGetImage() {
          return r("il2cpp_assembly_get_image", "pointer", ["pointer"]);
        },
        get classForEach() {
          return r("il2cpp_class_for_each", "void", ["pointer", "pointer"]);
        },
        get classFromName() {
          return r("il2cpp_class_from_name", "pointer", ["pointer", "pointer", "pointer"]);
        },
        get classFromObject() {
          return r("il2cpp_class_from_system_type", "pointer", ["pointer"]);
        },
        get classGetArrayClass() {
          return r("il2cpp_array_class_get", "pointer", ["pointer", "uint32"]);
        },
        get classGetArrayElementSize() {
          return r("il2cpp_class_array_element_size", "int", ["pointer"]);
        },
        get classGetAssemblyName() {
          return r("il2cpp_class_get_assemblyname", "pointer", ["pointer"]);
        },
        get classGetBaseType() {
          return r("il2cpp_class_enum_basetype", "pointer", ["pointer"]);
        },
        get classGetDeclaringType() {
          return r("il2cpp_class_get_declaring_type", "pointer", ["pointer"]);
        },
        get classGetElementClass() {
          return r("il2cpp_class_get_element_class", "pointer", ["pointer"]);
        },
        get classGetFieldFromName() {
          return r("il2cpp_class_get_field_from_name", "pointer", ["pointer", "pointer"]);
        },
        get classGetFields() {
          return r("il2cpp_class_get_fields", "pointer", ["pointer", "pointer"]);
        },
        get classGetFlags() {
          return r("il2cpp_class_get_flags", "int", ["pointer"]);
        },
        get classGetImage() {
          return r("il2cpp_class_get_image", "pointer", ["pointer"]);
        },
        get classGetInstanceSize() {
          return r("il2cpp_class_instance_size", "int32", ["pointer"]);
        },
        get classGetInterfaces() {
          return r("il2cpp_class_get_interfaces", "pointer", ["pointer", "pointer"]);
        },
        get classGetMethodFromName() {
          return r("il2cpp_class_get_method_from_name", "pointer", ["pointer", "pointer", "int"]);
        },
        get classGetMethods() {
          return r("il2cpp_class_get_methods", "pointer", ["pointer", "pointer"]);
        },
        get classGetName() {
          return r("il2cpp_class_get_name", "pointer", ["pointer"]);
        },
        get classGetNamespace() {
          return r("il2cpp_class_get_namespace", "pointer", ["pointer"]);
        },
        get classGetNestedClasses() {
          return r("il2cpp_class_get_nested_types", "pointer", ["pointer", "pointer"]);
        },
        get classGetParent() {
          return r("il2cpp_class_get_parent", "pointer", ["pointer"]);
        },
        get classGetStaticFieldData() {
          return r("il2cpp_class_get_static_field_data", "pointer", ["pointer"]);
        },
        get classGetValueTypeSize() {
          return r("il2cpp_class_value_size", "int32", ["pointer", "pointer"]);
        },
        get classGetType() {
          return r("il2cpp_class_get_type", "pointer", ["pointer"]);
        },
        get classHasReferences() {
          return r("il2cpp_class_has_references", "bool", ["pointer"]);
        },
        get classInitialize() {
          return r("il2cpp_runtime_class_init", "void", ["pointer"]);
        },
        get classIsAbstract() {
          return r("il2cpp_class_is_abstract", "bool", ["pointer"]);
        },
        get classIsAssignableFrom() {
          return r("il2cpp_class_is_assignable_from", "bool", ["pointer", "pointer"]);
        },
        get classIsBlittable() {
          return r("il2cpp_class_is_blittable", "bool", ["pointer"]);
        },
        get classIsEnum() {
          return r("il2cpp_class_is_enum", "bool", ["pointer"]);
        },
        get classIsGeneric() {
          return r("il2cpp_class_is_generic", "bool", ["pointer"]);
        },
        get classIsInflated() {
          return r("il2cpp_class_is_inflated", "bool", ["pointer"]);
        },
        get classIsInterface() {
          return r("il2cpp_class_is_interface", "bool", ["pointer"]);
        },
        get classIsSubclassOf() {
          return r("il2cpp_class_is_subclass_of", "bool", ["pointer", "pointer", "bool"]);
        },
        get classIsValueType() {
          return r("il2cpp_class_is_valuetype", "bool", ["pointer"]);
        },
        get domainGetAssemblyFromName() {
          return r("il2cpp_domain_assembly_open", "pointer", ["pointer", "pointer"]);
        },
        get domainGet() {
          return r("il2cpp_domain_get", "pointer", []);
        },
        get domainGetAssemblies() {
          return r("il2cpp_domain_get_assemblies", "pointer", ["pointer", "pointer"]);
        },
        get fieldGetClass() {
          return r("il2cpp_field_get_parent", "pointer", ["pointer"]);
        },
        get fieldGetFlags() {
          return r("il2cpp_field_get_flags", "int", ["pointer"]);
        },
        get fieldGetName() {
          return r("il2cpp_field_get_name", "pointer", ["pointer"]);
        },
        get fieldGetOffset() {
          return r("il2cpp_field_get_offset", "int32", ["pointer"]);
        },
        get fieldGetStaticValue() {
          return r("il2cpp_field_static_get_value", "void", ["pointer", "pointer"]);
        },
        get fieldGetType() {
          return r("il2cpp_field_get_type", "pointer", ["pointer"]);
        },
        get fieldSetStaticValue() {
          return r("il2cpp_field_static_set_value", "void", ["pointer", "pointer"]);
        },
        get free() {
          return r("il2cpp_free", "void", ["pointer"]);
        },
        get gcCollect() {
          return r("il2cpp_gc_collect", "void", ["int"]);
        },
        get gcCollectALittle() {
          return r("il2cpp_gc_collect_a_little", "void", []);
        },
        get gcDisable() {
          return r("il2cpp_gc_disable", "void", []);
        },
        get gcEnable() {
          return r("il2cpp_gc_enable", "void", []);
        },
        get gcGetHeapSize() {
          return r("il2cpp_gc_get_heap_size", "int64", []);
        },
        get gcGetMaxTimeSlice() {
          return r("il2cpp_gc_get_max_time_slice_ns", "int64", []);
        },
        get gcGetUsedSize() {
          return r("il2cpp_gc_get_used_size", "int64", []);
        },
        get gcHandleGetTarget() {
          return r("il2cpp_gchandle_get_target", "pointer", ["uint32"]);
        },
        get gcHandleFree() {
          return r("il2cpp_gchandle_free", "void", ["uint32"]);
        },
        get gcHandleNew() {
          return r("il2cpp_gchandle_new", "uint32", ["pointer", "bool"]);
        },
        get gcHandleNewWeakRef() {
          return r("il2cpp_gchandle_new_weakref", "uint32", ["pointer", "bool"]);
        },
        get gcIsDisabled() {
          return r("il2cpp_gc_is_disabled", "bool", []);
        },
        get gcIsIncremental() {
          return r("il2cpp_gc_is_incremental", "bool", []);
        },
        get gcSetMaxTimeSlice() {
          return r("il2cpp_gc_set_max_time_slice_ns", "void", ["int64"]);
        },
        get gcStartIncrementalCollection() {
          return r("il2cpp_gc_start_incremental_collection", "void", []);
        },
        get gcStartWorld() {
          return r("il2cpp_start_gc_world", "void", []);
        },
        get gcStopWorld() {
          return r("il2cpp_stop_gc_world", "void", []);
        },
        get getCorlib() {
          return r("il2cpp_get_corlib", "pointer", []);
        },
        get imageGetAssembly() {
          return r("il2cpp_image_get_assembly", "pointer", ["pointer"]);
        },
        get imageGetClass() {
          return r("il2cpp_image_get_class", "pointer", ["pointer", "uint"]);
        },
        get imageGetClassCount() {
          return r("il2cpp_image_get_class_count", "uint32", ["pointer"]);
        },
        get imageGetName() {
          return r("il2cpp_image_get_name", "pointer", ["pointer"]);
        },
        get initialize() {
          return r("il2cpp_init", "void", ["pointer"]);
        },
        get livenessAllocateStruct() {
          return r("il2cpp_unity_liveness_allocate_struct", "pointer", ["pointer", "int", "pointer", "pointer", "pointer"]);
        },
        get livenessCalculationBegin() {
          return r("il2cpp_unity_liveness_calculation_begin", "pointer", ["pointer", "int", "pointer", "pointer", "pointer", "pointer"]);
        },
        get livenessCalculationEnd() {
          return r("il2cpp_unity_liveness_calculation_end", "void", ["pointer"]);
        },
        get livenessCalculationFromStatics() {
          return r("il2cpp_unity_liveness_calculation_from_statics", "void", ["pointer"]);
        },
        get livenessFinalize() {
          return r("il2cpp_unity_liveness_finalize", "void", ["pointer"]);
        },
        get livenessFreeStruct() {
          return r("il2cpp_unity_liveness_free_struct", "void", ["pointer"]);
        },
        get memorySnapshotCapture() {
          return r("il2cpp_capture_memory_snapshot", "pointer", []);
        },
        get memorySnapshotFree() {
          return r("il2cpp_free_captured_memory_snapshot", "void", ["pointer"]);
        },
        get memorySnapshotGetClasses() {
          return r("il2cpp_memory_snapshot_get_classes", "pointer", ["pointer", "pointer"]);
        },
        get memorySnapshotGetObjects() {
          return r("il2cpp_memory_snapshot_get_objects", "pointer", ["pointer", "pointer"]);
        },
        get methodGetClass() {
          return r("il2cpp_method_get_class", "pointer", ["pointer"]);
        },
        get methodGetFlags() {
          return r("il2cpp_method_get_flags", "uint32", ["pointer", "pointer"]);
        },
        get methodGetName() {
          return r("il2cpp_method_get_name", "pointer", ["pointer"]);
        },
        get methodGetObject() {
          return r("il2cpp_method_get_object", "pointer", ["pointer", "pointer"]);
        },
        get methodGetParameterCount() {
          return r("il2cpp_method_get_param_count", "uint8", ["pointer"]);
        },
        get methodGetParameterName() {
          return r("il2cpp_method_get_param_name", "pointer", ["pointer", "uint32"]);
        },
        get methodGetParameters() {
          return r("il2cpp_method_get_parameters", "pointer", ["pointer", "pointer"]);
        },
        get methodGetParameterType() {
          return r("il2cpp_method_get_param", "pointer", ["pointer", "uint32"]);
        },
        get methodGetReturnType() {
          return r("il2cpp_method_get_return_type", "pointer", ["pointer"]);
        },
        get methodIsGeneric() {
          return r("il2cpp_method_is_generic", "bool", ["pointer"]);
        },
        get methodIsInflated() {
          return r("il2cpp_method_is_inflated", "bool", ["pointer"]);
        },
        get methodIsInstance() {
          return r("il2cpp_method_is_instance", "bool", ["pointer"]);
        },
        get monitorEnter() {
          return r("il2cpp_monitor_enter", "void", ["pointer"]);
        },
        get monitorExit() {
          return r("il2cpp_monitor_exit", "void", ["pointer"]);
        },
        get monitorPulse() {
          return r("il2cpp_monitor_pulse", "void", ["pointer"]);
        },
        get monitorPulseAll() {
          return r("il2cpp_monitor_pulse_all", "void", ["pointer"]);
        },
        get monitorTryEnter() {
          return r("il2cpp_monitor_try_enter", "bool", ["pointer", "uint32"]);
        },
        get monitorTryWait() {
          return r("il2cpp_monitor_try_wait", "bool", ["pointer", "uint32"]);
        },
        get monitorWait() {
          return r("il2cpp_monitor_wait", "void", ["pointer"]);
        },
        get objectGetClass() {
          return r("il2cpp_object_get_class", "pointer", ["pointer"]);
        },
        get objectGetVirtualMethod() {
          return r("il2cpp_object_get_virtual_method", "pointer", ["pointer", "pointer"]);
        },
        get objectInitialize() {
          return r("il2cpp_runtime_object_init_exception", "void", ["pointer", "pointer"]);
        },
        get objectNew() {
          return r("il2cpp_object_new", "pointer", ["pointer"]);
        },
        get objectGetSize() {
          return r("il2cpp_object_get_size", "uint32", ["pointer"]);
        },
        get objectUnbox() {
          return r("il2cpp_object_unbox", "pointer", ["pointer"]);
        },
        get resolveInternalCall() {
          return r("il2cpp_resolve_icall", "pointer", ["pointer"]);
        },
        get stringGetChars() {
          return r("il2cpp_string_chars", "pointer", ["pointer"]);
        },
        get stringGetLength() {
          return r("il2cpp_string_length", "int32", ["pointer"]);
        },
        get stringNew() {
          return r("il2cpp_string_new", "pointer", ["pointer"]);
        },
        get valueTypeBox() {
          return r("il2cpp_value_box", "pointer", ["pointer", "pointer"]);
        },
        get threadAttach() {
          return r("il2cpp_thread_attach", "pointer", ["pointer"]);
        },
        get threadDetach() {
          return r("il2cpp_thread_detach", "void", ["pointer"]);
        },
        get threadGetAttachedThreads() {
          return r("il2cpp_thread_get_all_attached_threads", "pointer", ["pointer"]);
        },
        get threadGetCurrent() {
          return r("il2cpp_thread_current", "pointer", []);
        },
        get threadIsVm() {
          return r("il2cpp_is_vm_thread", "bool", ["pointer"]);
        },
        get typeEquals() {
          return r("il2cpp_type_equals", "bool", ["pointer", "pointer"]);
        },
        get typeGetClass() {
          return r("il2cpp_class_from_type", "pointer", ["pointer"]);
        },
        get typeGetName() {
          return r("il2cpp_type_get_name", "pointer", ["pointer"]);
        },
        get typeGetObject() {
          return r("il2cpp_type_get_object", "pointer", ["pointer"]);
        },
        get typeGetTypeEnum() {
          return r("il2cpp_type_get_type", "int", ["pointer"]);
        }
      };
      decorate(Il2Cpp2.exports, lazy);
      getter(Il2Cpp2, "memorySnapshotExports", () => new CModule("#include <stdint.h>\n#include <string.h>\n\ntypedef struct Il2CppManagedMemorySnapshot Il2CppManagedMemorySnapshot;\ntypedef struct Il2CppMetadataType Il2CppMetadataType;\n\nstruct Il2CppManagedMemorySnapshot\n{\n  struct Il2CppManagedHeap\n  {\n    uint32_t section_count;\n    void * sections;\n  } heap;\n  struct Il2CppStacks\n  {\n    uint32_t stack_count;\n    void * stacks;\n  } stacks;\n  struct Il2CppMetadataSnapshot\n  {\n    uint32_t type_count;\n    Il2CppMetadataType * types;\n  } metadata_snapshot;\n  struct Il2CppGCHandles\n  {\n    uint32_t tracked_object_count;\n    void ** pointers_to_objects;\n  } gc_handles;\n  struct Il2CppRuntimeInformation\n  {\n    uint32_t pointer_size;\n    uint32_t object_header_size;\n    uint32_t array_header_size;\n    uint32_t array_bounds_offset_in_header;\n    uint32_t array_size_offset_in_header;\n    uint32_t allocation_granularity;\n  } runtime_information;\n  void * additional_user_information;\n};\n\nstruct Il2CppMetadataType\n{\n  uint32_t flags;\n  void * fields;\n  uint32_t field_count;\n  uint32_t statics_size;\n  uint8_t * statics;\n  uint32_t base_or_element_type_index;\n  char * name;\n  const char * assembly_name;\n  uint64_t type_info_address;\n  uint32_t size;\n};\n\nuintptr_t\nil2cpp_memory_snapshot_get_classes (\n    const Il2CppManagedMemorySnapshot * snapshot, Il2CppMetadataType ** iter)\n{\n  const int zero = 0;\n  const void * null = 0;\n\n  if (iter != NULL && snapshot->metadata_snapshot.type_count > zero)\n  {\n    if (*iter == null)\n    {\n      *iter = snapshot->metadata_snapshot.types;\n      return (uintptr_t) (*iter)->type_info_address;\n    }\n    else\n    {\n      Il2CppMetadataType * metadata_type = *iter + 1;\n\n      if (metadata_type < snapshot->metadata_snapshot.types +\n                              snapshot->metadata_snapshot.type_count)\n      {\n        *iter = metadata_type;\n        return (uintptr_t) (*iter)->type_info_address;\n      }\n    }\n  }\n  return 0;\n}\n\nvoid **\nil2cpp_memory_snapshot_get_objects (\n    const Il2CppManagedMemorySnapshot * snapshot, uint32_t * size)\n{\n  *size = snapshot->gc_handles.tracked_object_count;\n  return snapshot->gc_handles.pointers_to_objects;\n}\n"), lazy);
      function r(exportName, retType, argTypes) {
        const handle = Il2Cpp2.$config.exports?.[exportName]?.() ?? Il2Cpp2.module.findExportByName(exportName) ?? Il2Cpp2.memorySnapshotExports[exportName];
        const target = new NativeFunction(handle ?? NULL, retType, argTypes);
        return target.isNull() ? new Proxy(target, {
          get(value, name) {
            const property = value[name];
            return typeof property === "function" ? property.bind(value) : property;
          },
          apply() {
            if (handle == null) {
              raise(`couldn't resolve export ${exportName}`);
            } else if (handle.isNull()) {
              raise(`export ${exportName} points to NULL IL2CPP library has likely been stripped, obfuscated, or customized`);
            }
          }
        }) : target;
      }
    })(Il2Cpp || (Il2Cpp = {}));
    var Il2Cpp;
    (function(Il2Cpp2) {
      function is(klass) {
        return (element) => {
          if (element instanceof Il2Cpp2.Class) {
            return klass.isAssignableFrom(element);
          } else {
            return klass.isAssignableFrom(element.class);
          }
        };
      }
      Il2Cpp2.is = is;
      function isExactly(klass) {
        return (element) => {
          if (element instanceof Il2Cpp2.Class) {
            return element.equals(klass);
          } else {
            return element.class.equals(klass);
          }
        };
      }
      Il2Cpp2.isExactly = isExactly;
    })(Il2Cpp || (Il2Cpp = {}));
    var Il2Cpp;
    (function(Il2Cpp2) {
      Il2Cpp2.gc = {
        /**
         * Gets the heap size in bytes.
         */
        get heapSize() {
          return Il2Cpp2.exports.gcGetHeapSize();
        },
        /**
         * Determines whether the garbage collector is enabled.
         */
        get isEnabled() {
          return !Il2Cpp2.exports.gcIsDisabled();
        },
        /**
         * Determines whether the garbage collector is incremental
         * ([source](https://docs.unity3d.com/Manual/performance-incremental-garbage-collection.html)).
         */
        get isIncremental() {
          return !!Il2Cpp2.exports.gcIsIncremental();
        },
        /**
         * Gets the number of nanoseconds the garbage collector can spend in a
         * collection step.
         */
        get maxTimeSlice() {
          return Il2Cpp2.exports.gcGetMaxTimeSlice();
        },
        /**
         * Gets the used heap size in bytes.
         */
        get usedHeapSize() {
          return Il2Cpp2.exports.gcGetUsedSize();
        },
        /**
         * Enables or disables the garbage collector.
         */
        set isEnabled(value) {
          value ? Il2Cpp2.exports.gcEnable() : Il2Cpp2.exports.gcDisable();
        },
        /**
         *  Sets the number of nanoseconds the garbage collector can spend in
         * a collection step.
         */
        set maxTimeSlice(nanoseconds) {
          Il2Cpp2.exports.gcSetMaxTimeSlice(nanoseconds);
        },
        /**
         * Returns the heap allocated objects of the specified class. \
         * This variant reads GC descriptors.
         */
        choose(klass) {
          const matches = [];
          const callback = (objects, size) => {
            for (let i = 0; i < size; i++) {
              matches.push(new Il2Cpp2.Object(objects.add(i * Process.pointerSize).readPointer()));
            }
          };
          const chooseCallback = new NativeCallback(callback, "void", ["pointer", "int", "pointer"]);
          if (Il2Cpp2.unityVersionIsBelow202120) {
            const onWorld = new NativeCallback(() => {
            }, "void", []);
            const state = Il2Cpp2.exports.livenessCalculationBegin(klass, 0, chooseCallback, NULL, onWorld, onWorld);
            Il2Cpp2.exports.livenessCalculationFromStatics(state);
            Il2Cpp2.exports.livenessCalculationEnd(state);
          } else {
            const realloc = (handle, size) => {
              if (!handle.isNull() && size.compare(0) == 0) {
                Il2Cpp2.free(handle);
                return NULL;
              } else {
                return Il2Cpp2.alloc(size);
              }
            };
            const reallocCallback = new NativeCallback(realloc, "pointer", ["pointer", "size_t", "pointer"]);
            this.stopWorld();
            const state = Il2Cpp2.exports.livenessAllocateStruct(klass, 0, chooseCallback, NULL, reallocCallback);
            Il2Cpp2.exports.livenessCalculationFromStatics(state);
            Il2Cpp2.exports.livenessFinalize(state);
            this.startWorld();
            Il2Cpp2.exports.livenessFreeStruct(state);
          }
          return matches;
        },
        /**
         * Forces a garbage collection of the specified generation.
         */
        collect(generation) {
          Il2Cpp2.exports.gcCollect(generation < 0 ? 0 : generation > 2 ? 2 : generation);
        },
        /**
         * Forces a garbage collection.
         */
        collectALittle() {
          Il2Cpp2.exports.gcCollectALittle();
        },
        /**
         *  Resumes all the previously stopped threads.
         */
        startWorld() {
          return Il2Cpp2.exports.gcStartWorld();
        },
        /**
         * Performs an incremental garbage collection.
         */
        startIncrementalCollection() {
          return Il2Cpp2.exports.gcStartIncrementalCollection();
        },
        /**
         * Stops all threads which may access the garbage collected heap, other
         * than the caller.
         */
        stopWorld() {
          return Il2Cpp2.exports.gcStopWorld();
        }
      };
    })(Il2Cpp || (Il2Cpp = {}));
    var Android;
    (function(Android2) {
      getter(Android2, "apiLevel", () => {
        const value = getProperty("ro.build.version.sdk");
        return value ? parseInt(value) : null;
      }, lazy);
      function getProperty(name) {
        const handle = Process.findModuleByName("libc.so")?.findExportByName("__system_property_get");
        if (handle) {
          const __system_property_get = new NativeFunction(handle, "void", ["pointer", "pointer"]);
          const value = Memory.alloc(92).writePointer(NULL);
          __system_property_get(Memory.allocUtf8String(name), value);
          return value.readCString() ?? void 0;
        }
      }
    })(Android || (Android = {}));
    function raise(message) {
      const error = new Error(message);
      error.name = "Il2CppError";
      error.stack = error.stack?.replace(/^(Il2Cpp)?Error/, "\x1B[0m\x1B[38;5;9mil2cpp\x1B[0m")?.replace(/\n    at (.+) \((.+):(.+)\)/, "\x1B[3m\x1B[2m")?.concat("\x1B[0m");
      throw error;
    }
    function warn(message) {
      globalThis.console.log(`\x1B[38;5;11mil2cpp\x1B[0m: ${message}`);
    }
    function ok(message) {
      globalThis.console.log(`\x1B[38;5;10mil2cpp\x1B[0m: ${message}`);
    }
    function inform(message) {
      globalThis.console.log(`\x1B[38;5;12mil2cpp\x1B[0m: ${message}`);
    }
    function decorate(target, decorator, descriptors = Object.getOwnPropertyDescriptors(target)) {
      for (const key in descriptors) {
        descriptors[key] = decorator(target, key, descriptors[key]);
      }
      Object.defineProperties(target, descriptors);
      return target;
    }
    function getter(target, key, get, decorator) {
      globalThis.Object.defineProperty(target, key, decorator?.(target, key, { get, configurable: true }) ?? { get, configurable: true });
    }
    function cyrb53(str) {
      let h1 = 3735928559;
      let h2 = 1103547991;
      for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
      }
      h1 = Math.imul(h1 ^ h1 >>> 16, 2246822507);
      h1 ^= Math.imul(h2 ^ h2 >>> 13, 3266489909);
      h2 = Math.imul(h2 ^ h2 >>> 16, 2246822507);
      h2 ^= Math.imul(h1 ^ h1 >>> 13, 3266489909);
      return 4294967296 * (2097151 & h2) + (h1 >>> 0);
    }
    function exportsHash(module2) {
      return cyrb53(module2.enumerateExports().sort((a, b) => a.name.localeCompare(b.name)).map((_) => _.name + _.address.sub(module2.base)).join(""));
    }
    function lazy(_, propertyKey, descriptor) {
      const getter2 = descriptor.get;
      if (!getter2) {
        throw new Error("@lazy can only be applied to getter accessors");
      }
      descriptor.get = function() {
        const value = getter2.call(this);
        Object.defineProperty(this, propertyKey, {
          value,
          configurable: descriptor.configurable,
          enumerable: descriptor.enumerable,
          writable: false
        });
        return value;
      };
      return descriptor;
    }
    var NativeStruct = class {
      handle;
      constructor(handleOrWrapper) {
        if (handleOrWrapper instanceof NativePointer) {
          this.handle = handleOrWrapper;
        } else {
          this.handle = handleOrWrapper.handle;
        }
      }
      equals(other) {
        return this.handle.equals(other.handle);
      }
      isNull() {
        return this.handle.isNull();
      }
      asNullable() {
        return this.isNull() ? null : this;
      }
    };
    function addFlippedEntries(obj) {
      return Object.keys(obj).reduce((obj2, key) => (obj2[obj2[key]] = key, obj2), obj);
    }
    NativePointer.prototype.offsetOf = function(condition, depth) {
      depth ??= 512;
      for (let i = 0; depth > 0 ? i < depth : i < -depth; i++) {
        if (condition(depth > 0 ? this.add(i) : this.sub(i))) {
          return i;
        }
      }
      return null;
    };
    function readNativeIterator(block) {
      const array = [];
      const iterator = Memory.alloc(Process.pointerSize);
      let handle = block(iterator);
      while (!handle.isNull()) {
        array.push(handle);
        handle = block(iterator);
      }
      return array;
    }
    function readNativeList(block) {
      const lengthPointer = Memory.alloc(Process.pointerSize);
      const startPointer = block(lengthPointer);
      if (startPointer.isNull()) {
        return [];
      }
      const array = new Array(lengthPointer.readInt());
      for (let i = 0; i < array.length; i++) {
        array[i] = startPointer.add(i * Process.pointerSize).readPointer();
      }
      return array;
    }
    function recycle(Class) {
      return new Proxy(Class, {
        cache: /* @__PURE__ */ new Map(),
        construct(Target, argArray) {
          const handle = argArray[0].toUInt32();
          if (!this.cache.has(handle)) {
            this.cache.set(handle, new Target(argArray[0]));
          }
          return this.cache.get(handle);
        }
      });
    }
    var UnityVersion;
    (function(UnityVersion2) {
      const pattern = /(6\d{3}|20\d{2}|\d)\.(\d)\.(\d{1,2})(?:[abcfp]|rc){0,2}\d?/;
      function find(string) {
        return string?.match(pattern)?.[0];
      }
      UnityVersion2.find = find;
      function gte(a, b) {
        return compare(a, b) >= 0;
      }
      UnityVersion2.gte = gte;
      function lt(a, b) {
        return compare(a, b) < 0;
      }
      UnityVersion2.lt = lt;
      function compare(a, b) {
        const aMatches = a.match(pattern);
        const bMatches = b.match(pattern);
        for (let i = 1; i <= 3; i++) {
          const a2 = Number(aMatches?.[i] ?? -1);
          const b2 = Number(bMatches?.[i] ?? -1);
          if (a2 > b2)
            return 1;
          else if (a2 < b2)
            return -1;
        }
        return 0;
      }
    })(UnityVersion || (UnityVersion = {}));
    var Il2Cpp;
    (function(Il2Cpp2) {
      function alloc(size = Process.pointerSize) {
        return Il2Cpp2.exports.alloc(size);
      }
      Il2Cpp2.alloc = alloc;
      function free(pointer) {
        return Il2Cpp2.exports.free(pointer);
      }
      Il2Cpp2.free = free;
      function read(pointer, type) {
        switch (type.enumValue) {
          case Il2Cpp2.Type.Enum.BOOLEAN:
            return !!pointer.readS8();
          case Il2Cpp2.Type.Enum.BYTE:
            return pointer.readS8();
          case Il2Cpp2.Type.Enum.UBYTE:
            return pointer.readU8();
          case Il2Cpp2.Type.Enum.SHORT:
            return pointer.readS16();
          case Il2Cpp2.Type.Enum.USHORT:
            return pointer.readU16();
          case Il2Cpp2.Type.Enum.INT:
            return pointer.readS32();
          case Il2Cpp2.Type.Enum.UINT:
            return pointer.readU32();
          case Il2Cpp2.Type.Enum.CHAR:
            return pointer.readU16();
          case Il2Cpp2.Type.Enum.LONG:
            return pointer.readS64();
          case Il2Cpp2.Type.Enum.ULONG:
            return pointer.readU64();
          case Il2Cpp2.Type.Enum.FLOAT:
            return pointer.readFloat();
          case Il2Cpp2.Type.Enum.DOUBLE:
            return pointer.readDouble();
          case Il2Cpp2.Type.Enum.NINT:
          case Il2Cpp2.Type.Enum.NUINT:
            return pointer.readPointer();
          case Il2Cpp2.Type.Enum.POINTER:
            return new Il2Cpp2.Pointer(pointer.readPointer(), type.class.baseType);
          case Il2Cpp2.Type.Enum.VALUE_TYPE:
            return new Il2Cpp2.ValueType(pointer, type);
          case Il2Cpp2.Type.Enum.OBJECT:
          case Il2Cpp2.Type.Enum.CLASS:
            return new Il2Cpp2.Object(pointer.readPointer());
          case Il2Cpp2.Type.Enum.GENERIC_INSTANCE:
            return type.class.isValueType ? new Il2Cpp2.ValueType(pointer, type) : new Il2Cpp2.Object(pointer.readPointer());
          case Il2Cpp2.Type.Enum.STRING:
            return new Il2Cpp2.String(pointer.readPointer());
          case Il2Cpp2.Type.Enum.ARRAY:
          case Il2Cpp2.Type.Enum.NARRAY:
            return new Il2Cpp2.Array(pointer.readPointer());
        }
        raise(`couldn't read the value from ${pointer} using an unhandled or unknown type ${type.name} (${type.enumValue}), please file an issue`);
      }
      Il2Cpp2.read = read;
      function write(pointer, value, type) {
        switch (type.enumValue) {
          case Il2Cpp2.Type.Enum.BOOLEAN:
            return pointer.writeS8(+value);
          case Il2Cpp2.Type.Enum.BYTE:
            return pointer.writeS8(value);
          case Il2Cpp2.Type.Enum.UBYTE:
            return pointer.writeU8(value);
          case Il2Cpp2.Type.Enum.SHORT:
            return pointer.writeS16(value);
          case Il2Cpp2.Type.Enum.USHORT:
            return pointer.writeU16(value);
          case Il2Cpp2.Type.Enum.INT:
            return pointer.writeS32(value);
          case Il2Cpp2.Type.Enum.UINT:
            return pointer.writeU32(value);
          case Il2Cpp2.Type.Enum.CHAR:
            return pointer.writeU16(value);
          case Il2Cpp2.Type.Enum.LONG:
            return pointer.writeS64(value);
          case Il2Cpp2.Type.Enum.ULONG:
            return pointer.writeU64(value);
          case Il2Cpp2.Type.Enum.FLOAT:
            return pointer.writeFloat(value);
          case Il2Cpp2.Type.Enum.DOUBLE:
            return pointer.writeDouble(value);
          case Il2Cpp2.Type.Enum.NINT:
          case Il2Cpp2.Type.Enum.NUINT:
          case Il2Cpp2.Type.Enum.POINTER:
          case Il2Cpp2.Type.Enum.STRING:
          case Il2Cpp2.Type.Enum.ARRAY:
          case Il2Cpp2.Type.Enum.NARRAY:
            return pointer.writePointer(value);
          case Il2Cpp2.Type.Enum.VALUE_TYPE:
            return Memory.copy(pointer, value, type.class.valueTypeSize), pointer;
          case Il2Cpp2.Type.Enum.OBJECT:
          case Il2Cpp2.Type.Enum.CLASS:
          case Il2Cpp2.Type.Enum.GENERIC_INSTANCE:
            return value instanceof Il2Cpp2.ValueType ? (Memory.copy(pointer, value, type.class.valueTypeSize), pointer) : pointer.writePointer(value);
        }
        raise(`couldn't write value ${value} to ${pointer} using an unhandled or unknown type ${type.name} (${type.enumValue}), please file an issue`);
      }
      Il2Cpp2.write = write;
      function fromFridaValue(value, type) {
        if (globalThis.Array.isArray(value)) {
          const handle = Memory.alloc(type.class.valueTypeSize);
          const fields = type.class.fields.filter((_) => !_.isStatic);
          for (let i = 0; i < fields.length; i++) {
            const convertedValue = fromFridaValue(value[i], fields[i].type);
            write(handle.add(fields[i].offset).sub(Il2Cpp2.Object.headerSize), convertedValue, fields[i].type);
          }
          return new Il2Cpp2.ValueType(handle, type);
        } else if (value instanceof NativePointer) {
          if (type.isByReference) {
            return new Il2Cpp2.Reference(value, type);
          }
          switch (type.enumValue) {
            case Il2Cpp2.Type.Enum.POINTER:
              return new Il2Cpp2.Pointer(value, type.class.baseType);
            case Il2Cpp2.Type.Enum.STRING:
              return new Il2Cpp2.String(value);
            case Il2Cpp2.Type.Enum.CLASS:
            case Il2Cpp2.Type.Enum.GENERIC_INSTANCE:
            case Il2Cpp2.Type.Enum.OBJECT:
              return new Il2Cpp2.Object(value);
            case Il2Cpp2.Type.Enum.ARRAY:
            case Il2Cpp2.Type.Enum.NARRAY:
              return new Il2Cpp2.Array(value);
            default:
              return value;
          }
        } else if (type.enumValue == Il2Cpp2.Type.Enum.BOOLEAN) {
          return !!value;
        } else if (type.enumValue == Il2Cpp2.Type.Enum.VALUE_TYPE && type.class.isEnum) {
          return fromFridaValue([value], type);
        } else {
          return value;
        }
      }
      Il2Cpp2.fromFridaValue = fromFridaValue;
      function toFridaValue(value) {
        if (typeof value == "boolean") {
          return +value;
        } else if (value instanceof Il2Cpp2.ValueType) {
          if (value.type.class.isEnum) {
            return value.field("value__").value;
          } else {
            const _ = value.type.class.fields.filter((_2) => !_2.isStatic).map((_2) => toFridaValue(_2.bind(value).value));
            return _.length == 0 ? [0] : _;
          }
        } else {
          return value;
        }
      }
      Il2Cpp2.toFridaValue = toFridaValue;
    })(Il2Cpp || (Il2Cpp = {}));
    var Il2Cpp;
    (function(Il2Cpp2) {
      getter(Il2Cpp2, "module", () => {
        return tryModule() ?? raise("Could not find IL2CPP module");
      });
      async function initialize(blocking = false) {
        const module2 = tryModule() ?? await new Promise((resolve) => {
          const [moduleName, fallbackModuleName] = getExpectedModuleNames();
          const timeout = setTimeout(() => {
            warn(`after 10 seconds, IL2CPP module '${moduleName}' has not been loaded yet, is the app running?`);
          }, 1e4);
          const moduleObserver = Process.attachModuleObserver({
            onAdded(module3) {
              if (module3.name == moduleName || fallbackModuleName && module3.name == fallbackModuleName) {
                clearTimeout(timeout);
                setImmediate(() => {
                  resolve(module3);
                  moduleObserver.detach();
                });
              }
            }
          });
        });
        Reflect.defineProperty(Il2Cpp2, "module", { value: module2 });
        if (Il2Cpp2.exports.getCorlib().isNull()) {
          return await new Promise((resolve) => {
            const interceptor = Interceptor.attach(Il2Cpp2.exports.initialize, {
              onLeave() {
                interceptor.detach();
                blocking ? resolve(true) : setImmediate(() => resolve(false));
              }
            });
          });
        }
        return false;
      }
      Il2Cpp2.initialize = initialize;
      function tryModule() {
        const [moduleName, fallback] = getExpectedModuleNames();
        return Process.findModuleByName(moduleName) ?? Process.findModuleByName(fallback ?? moduleName) ?? (Process.platform == "darwin" ? Process.findModuleByAddress(DebugSymbol.fromName("il2cpp_init").address) : void 0) ?? void 0;
      }
      function getExpectedModuleNames() {
        if (Il2Cpp2.$config.moduleName) {
          return [Il2Cpp2.$config.moduleName];
        }
        switch (Process.platform) {
          case "linux":
            return [Android.apiLevel ? "libil2cpp.so" : "GameAssembly.so"];
          case "windows":
            return ["GameAssembly.dll"];
          case "darwin":
            return ["UnityFramework", "GameAssembly.dylib"];
        }
        raise(`${Process.platform} is not supported yet`);
      }
    })(Il2Cpp || (Il2Cpp = {}));
    var Il2Cpp;
    (function(Il2Cpp2) {
      async function perform(block, flag = "bind") {
        let attachedThread = null;
        try {
          const isInMainThread = await Il2Cpp2.initialize(flag == "main");
          if (flag == "main" && !isInMainThread) {
            return perform(() => Il2Cpp2.mainThread.schedule(block), "free");
          }
          if (Il2Cpp2.currentThread == null) {
            attachedThread = Il2Cpp2.domain.attach();
          }
          if (flag == "bind" && attachedThread != null) {
            Script.bindWeak(globalThis, () => attachedThread?.detach());
          }
          const result = block();
          return result instanceof Promise ? await result : result;
        } catch (error) {
          Script.nextTick((_) => {
            throw _;
          }, error);
          return Promise.reject(error);
        } finally {
          if (flag == "free" && attachedThread != null) {
            attachedThread.detach();
          }
        }
      }
      Il2Cpp2.perform = perform;
    })(Il2Cpp || (Il2Cpp = {}));
    var Il2Cpp;
    (function(Il2Cpp2) {
      class Tracer {
        /** @internal */
        #state = {
          depth: 0,
          buffer: [],
          history: /* @__PURE__ */ new Set(),
          flush: () => {
            if (this.#state.depth == 0) {
              const message = `
${this.#state.buffer.join("\n")}
`;
              if (this.#verbose) {
                inform(message);
              } else {
                const hash = cyrb53(message);
                if (!this.#state.history.has(hash)) {
                  this.#state.history.add(hash);
                  inform(message);
                }
              }
              this.#state.buffer.length = 0;
            }
          }
        };
        /** @internal */
        #threadId = Il2Cpp2.mainThread.id;
        /** @internal */
        #verbose = false;
        /** @internal */
        #applier;
        /** @internal */
        #targets = [];
        /** @internal */
        #domain;
        /** @internal */
        #assemblies;
        /** @internal */
        #classes;
        /** @internal */
        #methods;
        /** @internal */
        #assemblyFilter;
        /** @internal */
        #classFilter;
        /** @internal */
        #methodFilter;
        /** @internal */
        #parameterFilter;
        constructor(applier) {
          this.#applier = applier;
        }
        /** */
        thread(thread) {
          this.#threadId = thread.id;
          return this;
        }
        /** Determines whether print duplicate logs. */
        verbose(value) {
          this.#verbose = value;
          return this;
        }
        /** Sets the application domain as the place where to find the target methods. */
        domain() {
          this.#domain = Il2Cpp2.domain;
          return this;
        }
        /** Sets the passed `assemblies` as the place where to find the target methods. */
        assemblies(...assemblies) {
          this.#assemblies = assemblies;
          return this;
        }
        /** Sets the passed `classes` as the place where to find the target methods. */
        classes(...classes) {
          this.#classes = classes;
          return this;
        }
        /** Sets the passed `methods` as the target methods. */
        methods(...methods) {
          this.#methods = methods;
          return this;
        }
        /** Filters the assemblies where to find the target methods. */
        filterAssemblies(filter) {
          this.#assemblyFilter = filter;
          return this;
        }
        /** Filters the classes where to find the target methods. */
        filterClasses(filter) {
          this.#classFilter = filter;
          return this;
        }
        /** Filters the target methods. */
        filterMethods(filter) {
          this.#methodFilter = filter;
          return this;
        }
        /** Filters the target methods. */
        filterParameters(filter) {
          this.#parameterFilter = filter;
          return this;
        }
        /** Commits the current changes by finding the target methods. */
        and() {
          const filterMethod = (method) => {
            if (this.#parameterFilter == void 0) {
              this.#targets.push(method);
              return;
            }
            for (const parameter of method.parameters) {
              if (this.#parameterFilter(parameter)) {
                this.#targets.push(method);
                break;
              }
            }
          };
          const filterMethods = (values) => {
            for (const method of values) {
              filterMethod(method);
            }
          };
          const filterClass = (klass) => {
            if (this.#methodFilter == void 0) {
              filterMethods(klass.methods);
              return;
            }
            for (const method of klass.methods) {
              if (this.#methodFilter(method)) {
                filterMethod(method);
              }
            }
          };
          const filterClasses = (values) => {
            for (const klass of values) {
              filterClass(klass);
            }
          };
          const filterAssembly = (assembly) => {
            if (this.#classFilter == void 0) {
              filterClasses(assembly.image.classes);
              return;
            }
            for (const klass of assembly.image.classes) {
              if (this.#classFilter(klass)) {
                filterClass(klass);
              }
            }
          };
          const filterAssemblies = (assemblies) => {
            for (const assembly of assemblies) {
              filterAssembly(assembly);
            }
          };
          const filterDomain = (domain) => {
            if (this.#assemblyFilter == void 0) {
              filterAssemblies(domain.assemblies);
              return;
            }
            for (const assembly of domain.assemblies) {
              if (this.#assemblyFilter(assembly)) {
                filterAssembly(assembly);
              }
            }
          };
          this.#methods ? filterMethods(this.#methods) : this.#classes ? filterClasses(this.#classes) : this.#assemblies ? filterAssemblies(this.#assemblies) : this.#domain ? filterDomain(this.#domain) : void 0;
          this.#assemblies = void 0;
          this.#classes = void 0;
          this.#methods = void 0;
          this.#assemblyFilter = void 0;
          this.#classFilter = void 0;
          this.#methodFilter = void 0;
          this.#parameterFilter = void 0;
          return this;
        }
        /** Starts tracing. */
        attach() {
          for (const target of this.#targets) {
            if (!target.virtualAddress.isNull()) {
              try {
                this.#applier(target, this.#state, this.#threadId);
              } catch (e) {
                switch (e.message) {
                  case /unable to intercept function at \w+; please file a bug/.exec(e.message)?.input:
                  case "already replaced this function":
                    break;
                  default:
                    throw e;
                }
              }
            }
          }
        }
      }
      Il2Cpp2.Tracer = Tracer;
      function trace(parameters = false) {
        const applier = () => (method, state, threadId) => {
          const paddedVirtualAddress = method.relativeVirtualAddress.toString(16).padStart(8, "0");
          Interceptor.attach(method.virtualAddress, {
            onEnter() {
              if (this.threadId == threadId) {
                state.buffer.push(`\x1B[2m0x${paddedVirtualAddress}\x1B[0m ${`\u2502 `.repeat(state.depth++)}\u250C\u2500\x1B[35m${method.class.type.name}::\x1B[1m${method.name}\x1B[0m\x1B[0m`);
              }
            },
            onLeave() {
              if (this.threadId == threadId) {
                state.buffer.push(`\x1B[2m0x${paddedVirtualAddress}\x1B[0m ${`\u2502 `.repeat(--state.depth)}\u2514\u2500\x1B[33m${method.class.type.name}::\x1B[1m${method.name}\x1B[0m\x1B[0m`);
                state.flush();
              }
            }
          });
        };
        const applierWithParameters = () => (method, state, threadId) => {
          const paddedVirtualAddress = method.relativeVirtualAddress.toString(16).padStart(8, "0");
          const startIndex = +!method.isStatic | +Il2Cpp2.unityVersionIsBelow201830;
          const callback = function(...args) {
            if (this.threadId == threadId) {
              const thisParameter = method.isStatic ? void 0 : new Il2Cpp2.Parameter("this", -1, method.class.type);
              const parameters2 = thisParameter ? [thisParameter].concat(method.parameters) : method.parameters;
              state.buffer.push(`\x1B[2m0x${paddedVirtualAddress}\x1B[0m ${`\u2502 `.repeat(state.depth++)}\u250C\u2500\x1B[35m${method.class.type.name}::\x1B[1m${method.name}\x1B[0m\x1B[0m(${parameters2.map((e) => `\x1B[32m${e.name}\x1B[0m = \x1B[31m${Il2Cpp2.fromFridaValue(args[e.position + startIndex], e.type)}\x1B[0m`).join(", ")})`);
            }
            const returnValue = method.nativeFunction(...args);
            if (this.threadId == threadId) {
              state.buffer.push(`\x1B[2m0x${paddedVirtualAddress}\x1B[0m ${`\u2502 `.repeat(--state.depth)}\u2514\u2500\x1B[33m${method.class.type.name}::\x1B[1m${method.name}\x1B[0m\x1B[0m${returnValue == void 0 ? "" : ` = \x1B[36m${Il2Cpp2.fromFridaValue(returnValue, method.returnType)}`}\x1B[0m`);
              state.flush();
            }
            return returnValue;
          };
          method.revert();
          const nativeCallback = new NativeCallback(callback, method.returnType.fridaAlias, method.fridaSignature);
          Interceptor.replace(method.virtualAddress, nativeCallback);
        };
        return new Il2Cpp2.Tracer(parameters ? applierWithParameters() : applier());
      }
      Il2Cpp2.trace = trace;
      function backtrace(mode) {
        const methods = Il2Cpp2.domain.assemblies.flatMap((_) => _.image.classes.flatMap((_2) => _2.methods.filter((_3) => !_3.virtualAddress.isNull()))).sort((_, __) => _.virtualAddress.compare(__.virtualAddress));
        const searchInsert = (target) => {
          let left = 0;
          let right = methods.length - 1;
          while (left <= right) {
            const pivot = Math.floor((left + right) / 2);
            const comparison = methods[pivot].virtualAddress.compare(target);
            if (comparison == 0) {
              return methods[pivot];
            } else if (comparison > 0) {
              right = pivot - 1;
            } else {
              left = pivot + 1;
            }
          }
          return methods[right];
        };
        const applier = () => (method, state, threadId) => {
          Interceptor.attach(method.virtualAddress, function() {
            if (this.threadId == threadId) {
              const handles = globalThis.Thread.backtrace(this.context, mode);
              handles.unshift(method.virtualAddress);
              for (const handle of handles) {
                if (handle.compare(Il2Cpp2.module.base) > 0 && handle.compare(Il2Cpp2.module.base.add(Il2Cpp2.module.size)) < 0) {
                  const method2 = searchInsert(handle);
                  if (method2) {
                    const offset = handle.sub(method2.virtualAddress);
                    if (offset.compare(4095) < 0) {
                      state.buffer.push(`\x1B[2m0x${method2.relativeVirtualAddress.toString(16).padStart(8, "0")}\x1B[0m\x1B[2m+0x${offset.toString(16).padStart(3, `0`)}\x1B[0m ${method2.class.type.name}::\x1B[1m${method2.name}\x1B[0m`);
                    }
                  }
                }
              }
              state.flush();
            }
          });
        };
        return new Il2Cpp2.Tracer(applier());
      }
      Il2Cpp2.backtrace = backtrace;
    })(Il2Cpp || (Il2Cpp = {}));
    var Il2Cpp;
    (function(Il2Cpp2) {
      class Array2 extends NativeStruct {
        /** Gets the Il2CppArray struct size, possibly equal to `Process.pointerSize * 4`. */
        static get headerSize() {
          return Il2Cpp2.corlib.class("System.Array").instanceSize;
        }
        /** @internal Gets a pointer to the first element of the current array. */
        get elements() {
          const array2 = Il2Cpp2.string("v").object.method("ToCharArray", 0).invoke();
          const offset = array2.handle.offsetOf((_) => _.readS16() == 118) ?? raise("couldn't find the elements offset in the native array struct");
          getter(Il2Cpp2.Array.prototype, "elements", function() {
            return new Il2Cpp2.Pointer(this.handle.add(offset), this.elementType);
          }, lazy);
          return this.elements;
        }
        /** Gets the size of the object encompassed by the current array. */
        get elementSize() {
          return this.elementType.class.arrayElementSize;
        }
        /** Gets the type of the object encompassed by the current array. */
        get elementType() {
          return this.object.class.type.class.baseType;
        }
        /** Gets the total number of elements in all the dimensions of the current array. */
        get length() {
          return Il2Cpp2.exports.arrayGetLength(this);
        }
        /** Gets the encompassing object of the current array. */
        get object() {
          return new Il2Cpp2.Object(this);
        }
        /** Gets the element at the specified index of the current array. */
        get(index) {
          if (index < 0 || index >= this.length) {
            raise(`cannot get element at index ${index} as the array length is ${this.length}`);
          }
          return this.elements.get(index);
        }
        /** Sets the element at the specified index of the current array. */
        set(index, value) {
          if (index < 0 || index >= this.length) {
            raise(`cannot set element at index ${index} as the array length is ${this.length}`);
          }
          this.elements.set(index, value);
        }
        /** */
        toString() {
          return this.isNull() ? "null" : `[${this.elements.read(this.length, 0)}]`;
        }
        /** Iterable. */
        *[Symbol.iterator]() {
          for (let i = 0; i < this.length; i++) {
            yield this.elements.get(i);
          }
        }
      }
      __decorate([
        lazy
      ], Array2.prototype, "elementSize", null);
      __decorate([
        lazy
      ], Array2.prototype, "elementType", null);
      __decorate([
        lazy
      ], Array2.prototype, "length", null);
      __decorate([
        lazy
      ], Array2.prototype, "object", null);
      __decorate([
        lazy
      ], Array2, "headerSize", null);
      Il2Cpp2.Array = Array2;
      function array(klass, lengthOrElements) {
        const length = typeof lengthOrElements == "number" ? lengthOrElements : lengthOrElements.length;
        const array2 = new Il2Cpp2.Array(Il2Cpp2.exports.arrayNew(klass, length));
        if (globalThis.Array.isArray(lengthOrElements)) {
          array2.elements.write(lengthOrElements);
        }
        return array2;
      }
      Il2Cpp2.array = array;
    })(Il2Cpp || (Il2Cpp = {}));
    var Il2Cpp;
    (function(Il2Cpp2) {
      let Assembly = class Assembly extends NativeStruct {
        /** Gets the image of this assembly. */
        get image() {
          if (Il2Cpp2.exports.assemblyGetImage.isNull()) {
            const runtimeModule = this.object.tryMethod("GetType", 1)?.invoke(Il2Cpp2.string("<Module>"))?.asNullable()?.tryMethod("get_Module")?.invoke() ?? this.object.tryMethod("GetModules", 1)?.invoke(false)?.get(0) ?? raise(`couldn't find the runtime module object of assembly ${this.name}`);
            return new Il2Cpp2.Image(runtimeModule.field("_impl").value);
          }
          return new Il2Cpp2.Image(Il2Cpp2.exports.assemblyGetImage(this));
        }
        /** Gets the name of this assembly. */
        get name() {
          return this.image.name.replace(".dll", "");
        }
        /** Gets the encompassing object of the current assembly. */
        get object() {
          for (const _ of Il2Cpp2.domain.object.method("GetAssemblies", 1).invoke(false)) {
            if (_.field("_mono_assembly").value.equals(this)) {
              return _;
            }
          }
          raise("couldn't find the object of the native assembly struct");
        }
      };
      __decorate([
        lazy
      ], Assembly.prototype, "name", null);
      __decorate([
        lazy
      ], Assembly.prototype, "object", null);
      Assembly = __decorate([
        recycle
      ], Assembly);
      Il2Cpp2.Assembly = Assembly;
    })(Il2Cpp || (Il2Cpp = {}));
    var Il2Cpp;
    (function(Il2Cpp2) {
      let Class = class Class extends NativeStruct {
        /** Gets the actual size of the instance of the current class. */
        get actualInstanceSize() {
          const SystemString = Il2Cpp2.corlib.class("System.String");
          const offset = SystemString.handle.offsetOf((_) => _.readInt() == SystemString.instanceSize - 2) ?? raise("couldn't find the actual instance size offset in the native class struct");
          getter(Il2Cpp2.Class.prototype, "actualInstanceSize", function() {
            return this.handle.add(offset).readS32();
          }, lazy);
          return this.actualInstanceSize;
        }
        /** Gets the array class which encompass the current class. */
        get arrayClass() {
          return new Il2Cpp2.Class(Il2Cpp2.exports.classGetArrayClass(this, 1));
        }
        /** Gets the size of the object encompassed by the current array class. */
        get arrayElementSize() {
          return Il2Cpp2.exports.classGetArrayElementSize(this);
        }
        /** Gets the name of the assembly in which the current class is defined. */
        get assemblyName() {
          return Il2Cpp2.exports.classGetAssemblyName(this).readUtf8String().replace(".dll", "");
        }
        /** Gets the class that declares the current nested class. */
        get declaringClass() {
          return new Il2Cpp2.Class(Il2Cpp2.exports.classGetDeclaringType(this)).asNullable();
        }
        /** Gets the encompassed type of this array, reference, pointer or enum type. */
        get baseType() {
          return new Il2Cpp2.Type(Il2Cpp2.exports.classGetBaseType(this)).asNullable();
        }
        /** Gets the class of the object encompassed or referred to by the current array, pointer or reference class. */
        get elementClass() {
          return new Il2Cpp2.Class(Il2Cpp2.exports.classGetElementClass(this)).asNullable();
        }
        /** Gets the fields of the current class. */
        get fields() {
          return readNativeIterator((_) => Il2Cpp2.exports.classGetFields(this, _)).map((_) => new Il2Cpp2.Field(_));
        }
        /** Gets the flags of the current class. */
        get flags() {
          return Il2Cpp2.exports.classGetFlags(this);
        }
        /** Gets the full name (namespace + name) of the current class. */
        get fullName() {
          return this.namespace ? `${this.namespace}.${this.name}` : this.name;
        }
        /** Gets the generic class of the current class if the current class is inflated. */
        get genericClass() {
          const klass = this.image.tryClass(this.fullName)?.asNullable();
          return klass?.equals(this) ? null : klass ?? null;
        }
        /** Gets the generics parameters of this generic class. */
        get generics() {
          if (!this.isGeneric && !this.isInflated) {
            return [];
          }
          const types = this.type.object.method("GetGenericArguments").invoke();
          return globalThis.Array.from(types).map((_) => new Il2Cpp2.Class(Il2Cpp2.exports.classFromObject(_)));
        }
        /** Determines whether the GC has tracking references to the current class instances. */
        get hasReferences() {
          return !!Il2Cpp2.exports.classHasReferences(this);
        }
        /** Determines whether ther current class has a valid static constructor. */
        get hasStaticConstructor() {
          const staticConstructor = this.tryMethod(".cctor");
          return staticConstructor != null && !staticConstructor.virtualAddress.isNull();
        }
        /** Gets the image in which the current class is defined. */
        get image() {
          return new Il2Cpp2.Image(Il2Cpp2.exports.classGetImage(this));
        }
        /** Gets the size of the instance of the current class. */
        get instanceSize() {
          return Il2Cpp2.exports.classGetInstanceSize(this);
        }
        /** Determines whether the current class is abstract. */
        get isAbstract() {
          return !!Il2Cpp2.exports.classIsAbstract(this);
        }
        /** Determines whether the current class is blittable. */
        get isBlittable() {
          return !!Il2Cpp2.exports.classIsBlittable(this);
        }
        /** Determines whether the current class is an enumeration. */
        get isEnum() {
          return !!Il2Cpp2.exports.classIsEnum(this);
        }
        /** Determines whether the current class is a generic one. */
        get isGeneric() {
          return !!Il2Cpp2.exports.classIsGeneric(this);
        }
        /** Determines whether the current class is inflated. */
        get isInflated() {
          return !!Il2Cpp2.exports.classIsInflated(this);
        }
        /** Determines whether the current class is an interface. */
        get isInterface() {
          return !!Il2Cpp2.exports.classIsInterface(this);
        }
        /** Determines whether the current class is a struct. */
        get isStruct() {
          return this.isValueType && !this.isEnum;
        }
        /** Determines whether the current class is a value type. */
        get isValueType() {
          return !!Il2Cpp2.exports.classIsValueType(this);
        }
        /** Gets the interfaces implemented or inherited by the current class. */
        get interfaces() {
          return readNativeIterator((_) => Il2Cpp2.exports.classGetInterfaces(this, _)).map((_) => new Il2Cpp2.Class(_));
        }
        /** Gets the methods implemented by the current class. */
        get methods() {
          return readNativeIterator((_) => Il2Cpp2.exports.classGetMethods(this, _)).map((_) => new Il2Cpp2.Method(_));
        }
        /** Gets the name of the current class. */
        get name() {
          return Il2Cpp2.exports.classGetName(this).readUtf8String();
        }
        /** Gets the namespace of the current class. */
        get namespace() {
          return Il2Cpp2.exports.classGetNamespace(this).readUtf8String() || void 0;
        }
        /** Gets the classes nested inside the current class. */
        get nestedClasses() {
          return readNativeIterator((_) => Il2Cpp2.exports.classGetNestedClasses(this, _)).map((_) => new Il2Cpp2.Class(_));
        }
        /** Gets the class from which the current class directly inherits. */
        get parent() {
          return new Il2Cpp2.Class(Il2Cpp2.exports.classGetParent(this)).asNullable();
        }
        /** Gets the pointer class of the current class. */
        get pointerClass() {
          return new Il2Cpp2.Class(Il2Cpp2.exports.classFromObject(this.type.object.method("MakePointerType").invoke()));
        }
        /** Gets the rank (number of dimensions) of the current array class. */
        get rank() {
          let rank = 0;
          const name = this.name;
          for (let i = this.name.length - 1; i > 0; i--) {
            const c = name[i];
            if (c == "]")
              rank++;
            else if (c == "[" || rank == 0)
              break;
            else if (c == ",")
              rank++;
            else
              break;
          }
          return rank;
        }
        /** Gets a pointer to the static fields of the current class. */
        get staticFieldsData() {
          return Il2Cpp2.exports.classGetStaticFieldData(this);
        }
        /** Gets the size of the instance - as a value type - of the current class. */
        get valueTypeSize() {
          return Il2Cpp2.exports.classGetValueTypeSize(this, NULL);
        }
        /** Gets the type of the current class. */
        get type() {
          return new Il2Cpp2.Type(Il2Cpp2.exports.classGetType(this));
        }
        /** Allocates a new object of the current class. */
        alloc() {
          return new Il2Cpp2.Object(Il2Cpp2.exports.objectNew(this));
        }
        /** Gets the field identified by the given name. */
        field(name) {
          return this.tryField(name) ?? raise(`couldn't find field ${name} in class ${this.type.name}`);
        }
        /** Gets the hierarchy of the current class. */
        *hierarchy(options) {
          let klass = options?.includeCurrent ?? true ? this : this.parent;
          while (klass) {
            yield klass;
            klass = klass.parent;
          }
        }
        /** Builds a generic instance of the current generic class. */
        inflate(...classes) {
          if (!this.isGeneric) {
            raise(`cannot inflate class ${this.type.name} as it has no generic parameters`);
          }
          if (this.generics.length != classes.length) {
            raise(`cannot inflate class ${this.type.name} as it needs ${this.generics.length} generic parameter(s), not ${classes.length}`);
          }
          const types = classes.map((_) => _.type.object);
          const typeArray = Il2Cpp2.array(Il2Cpp2.corlib.class("System.Type"), types);
          const inflatedType = this.type.object.method("MakeGenericType", 1).invoke(typeArray);
          return new Il2Cpp2.Class(Il2Cpp2.exports.classFromObject(inflatedType));
        }
        /** Calls the static constructor of the current class. */
        initialize() {
          Il2Cpp2.exports.classInitialize(this);
          return this;
        }
        /** Determines whether an instance of `other` class can be assigned to a variable of the current type. */
        isAssignableFrom(other) {
          return !!Il2Cpp2.exports.classIsAssignableFrom(this, other);
        }
        /** Determines whether the current class derives from `other` class. */
        isSubclassOf(other, checkInterfaces) {
          return !!Il2Cpp2.exports.classIsSubclassOf(this, other, +checkInterfaces);
        }
        /** Gets the method identified by the given name and parameter count. */
        method(name, parameterCount = -1) {
          return this.tryMethod(name, parameterCount) ?? raise(`couldn't find method ${name} in class ${this.type.name}`);
        }
        /** Gets the nested class with the given name. */
        nested(name) {
          return this.tryNested(name) ?? raise(`couldn't find nested class ${name} in class ${this.type.name}`);
        }
        /** Allocates a new object of the current class and calls its default constructor. */
        new() {
          const object = this.alloc();
          const exceptionArray = Memory.alloc(Process.pointerSize);
          Il2Cpp2.exports.objectInitialize(object, exceptionArray);
          const exception = exceptionArray.readPointer();
          if (!exception.isNull()) {
            raise(new Il2Cpp2.Object(exception).toString());
          }
          return object;
        }
        /** Gets the field with the given name. */
        tryField(name) {
          return new Il2Cpp2.Field(Il2Cpp2.exports.classGetFieldFromName(this, Memory.allocUtf8String(name))).asNullable();
        }
        /** Gets the method with the given name and parameter count. */
        tryMethod(name, parameterCount = -1) {
          return new Il2Cpp2.Method(Il2Cpp2.exports.classGetMethodFromName(this, Memory.allocUtf8String(name), parameterCount)).asNullable();
        }
        /** Gets the nested class with the given name. */
        tryNested(name) {
          return this.nestedClasses.find((_) => _.name == name);
        }
        /** */
        toString() {
          const inherited = [this.parent].concat(this.interfaces);
          return `// ${this.assemblyName}
${this.isEnum ? `enum` : this.isStruct ? `struct` : this.isInterface ? `interface` : `class`} ${this.type.name}${inherited ? ` : ${inherited.map((_) => _?.type.name).join(`, `)}` : ``}
{
    ${this.fields.join(`
    `)}
    ${this.methods.join(`
    `)}
}`;
        }
        /** Executes a callback for every defined class. */
        static enumerate(block) {
          const callback = new NativeCallback((_) => block(new Il2Cpp2.Class(_)), "void", ["pointer", "pointer"]);
          return Il2Cpp2.exports.classForEach(callback, NULL);
        }
      };
      __decorate([
        lazy
      ], Class.prototype, "arrayClass", null);
      __decorate([
        lazy
      ], Class.prototype, "arrayElementSize", null);
      __decorate([
        lazy
      ], Class.prototype, "assemblyName", null);
      __decorate([
        lazy
      ], Class.prototype, "declaringClass", null);
      __decorate([
        lazy
      ], Class.prototype, "baseType", null);
      __decorate([
        lazy
      ], Class.prototype, "elementClass", null);
      __decorate([
        lazy
      ], Class.prototype, "fields", null);
      __decorate([
        lazy
      ], Class.prototype, "flags", null);
      __decorate([
        lazy
      ], Class.prototype, "fullName", null);
      __decorate([
        lazy
      ], Class.prototype, "generics", null);
      __decorate([
        lazy
      ], Class.prototype, "hasReferences", null);
      __decorate([
        lazy
      ], Class.prototype, "hasStaticConstructor", null);
      __decorate([
        lazy
      ], Class.prototype, "image", null);
      __decorate([
        lazy
      ], Class.prototype, "instanceSize", null);
      __decorate([
        lazy
      ], Class.prototype, "isAbstract", null);
      __decorate([
        lazy
      ], Class.prototype, "isBlittable", null);
      __decorate([
        lazy
      ], Class.prototype, "isEnum", null);
      __decorate([
        lazy
      ], Class.prototype, "isGeneric", null);
      __decorate([
        lazy
      ], Class.prototype, "isInflated", null);
      __decorate([
        lazy
      ], Class.prototype, "isInterface", null);
      __decorate([
        lazy
      ], Class.prototype, "isValueType", null);
      __decorate([
        lazy
      ], Class.prototype, "interfaces", null);
      __decorate([
        lazy
      ], Class.prototype, "methods", null);
      __decorate([
        lazy
      ], Class.prototype, "name", null);
      __decorate([
        lazy
      ], Class.prototype, "namespace", null);
      __decorate([
        lazy
      ], Class.prototype, "nestedClasses", null);
      __decorate([
        lazy
      ], Class.prototype, "parent", null);
      __decorate([
        lazy
      ], Class.prototype, "pointerClass", null);
      __decorate([
        lazy
      ], Class.prototype, "rank", null);
      __decorate([
        lazy
      ], Class.prototype, "staticFieldsData", null);
      __decorate([
        lazy
      ], Class.prototype, "valueTypeSize", null);
      __decorate([
        lazy
      ], Class.prototype, "type", null);
      Class = __decorate([
        recycle
      ], Class);
      Il2Cpp2.Class = Class;
    })(Il2Cpp || (Il2Cpp = {}));
    var Il2Cpp;
    (function(Il2Cpp2) {
      function delegate(klass, block) {
        const SystemDelegate = Il2Cpp2.corlib.class("System.Delegate");
        const SystemMulticastDelegate = Il2Cpp2.corlib.class("System.MulticastDelegate");
        if (!SystemDelegate.isAssignableFrom(klass)) {
          raise(`cannot create a delegate for ${klass.type.name} as it's a non-delegate class`);
        }
        if (klass.equals(SystemDelegate) || klass.equals(SystemMulticastDelegate)) {
          raise(`cannot create a delegate for neither ${SystemDelegate.type.name} nor ${SystemMulticastDelegate.type.name}, use a subclass instead`);
        }
        const delegate2 = klass.alloc();
        const key = delegate2.handle.toString();
        const Invoke = delegate2.tryMethod("Invoke") ?? raise(`cannot create a delegate for ${klass.type.name}, there is no Invoke method`);
        delegate2.method(".ctor").invoke(delegate2, Invoke.handle);
        const callback = Invoke.wrap(block);
        delegate2.field("method_ptr").value = callback;
        delegate2.field("invoke_impl").value = callback;
        Il2Cpp2._callbacksToKeepAlive[key] = callback;
        return delegate2;
      }
      Il2Cpp2.delegate = delegate;
      Il2Cpp2._callbacksToKeepAlive = {};
    })(Il2Cpp || (Il2Cpp = {}));
    var Il2Cpp;
    (function(Il2Cpp2) {
      let Domain = class Domain extends NativeStruct {
        /** Gets the assemblies that have been loaded into the execution context of the application domain. */
        get assemblies() {
          let handles = readNativeList((_) => Il2Cpp2.exports.domainGetAssemblies(this, _));
          if (handles.length == 0) {
            const assemblyObjects = this.object.method("GetAssemblies").overload().invoke();
            handles = globalThis.Array.from(assemblyObjects).map((_) => _.field("_mono_assembly").value);
          }
          return handles.map((_) => new Il2Cpp2.Assembly(_));
        }
        /** Gets the encompassing object of the application domain. */
        get object() {
          return Il2Cpp2.corlib.class("System.AppDomain").method("get_CurrentDomain").invoke();
        }
        /** Opens and loads the assembly with the given name. */
        assembly(name) {
          return this.tryAssembly(name) ?? raise(`couldn't find assembly ${name}`);
        }
        /** Attached a new thread to the application domain. */
        attach() {
          return new Il2Cpp2.Thread(Il2Cpp2.exports.threadAttach(this));
        }
        /** Opens and loads the assembly with the given name. */
        tryAssembly(name) {
          return new Il2Cpp2.Assembly(Il2Cpp2.exports.domainGetAssemblyFromName(this, Memory.allocUtf8String(name))).asNullable();
        }
      };
      __decorate([
        lazy
      ], Domain.prototype, "assemblies", null);
      __decorate([
        lazy
      ], Domain.prototype, "object", null);
      Domain = __decorate([
        recycle
      ], Domain);
      Il2Cpp2.Domain = Domain;
      getter(Il2Cpp2, "domain", () => {
        return new Il2Cpp2.Domain(Il2Cpp2.exports.domainGet());
      }, lazy);
    })(Il2Cpp || (Il2Cpp = {}));
    var Il2Cpp;
    (function(Il2Cpp2) {
      class Field extends NativeStruct {
        /** Gets the class in which this field is defined. */
        get class() {
          return new Il2Cpp2.Class(Il2Cpp2.exports.fieldGetClass(this));
        }
        /** Gets the flags of the current field. */
        get flags() {
          return Il2Cpp2.exports.fieldGetFlags(this);
        }
        /** Determines whether this field value is known at compile time. */
        get isLiteral() {
          return (this.flags & 64) != 0;
        }
        /** Determines whether this field is static. */
        get isStatic() {
          return (this.flags & 16) != 0;
        }
        /** Determines whether this field is thread static. */
        get isThreadStatic() {
          const offset = Il2Cpp2.corlib.class("System.AppDomain").field("type_resolve_in_progress").offset;
          getter(Il2Cpp2.Field.prototype, "isThreadStatic", function() {
            return this.offset == offset;
          }, lazy);
          return this.isThreadStatic;
        }
        /** Gets the access modifier of this field. */
        get modifier() {
          switch (this.flags & 7) {
            case 1:
              return "private";
            case 2:
              return "private protected";
            case 3:
              return "internal";
            case 4:
              return "protected";
            case 5:
              return "protected internal";
            case 6:
              return "public";
          }
        }
        /** Gets the name of this field. */
        get name() {
          return Il2Cpp2.exports.fieldGetName(this).readUtf8String();
        }
        /** Gets the offset of this field, calculated as the difference with its owner virtual address. */
        get offset() {
          return Il2Cpp2.exports.fieldGetOffset(this);
        }
        /** Gets the type of this field. */
        get type() {
          return new Il2Cpp2.Type(Il2Cpp2.exports.fieldGetType(this));
        }
        /** Gets the value of this field. */
        get value() {
          if (!this.isStatic) {
            raise(`cannot access instance field ${this.class.type.name}::${this.name} from a class, use an object instead`);
          }
          const handle = Memory.alloc(Process.pointerSize);
          Il2Cpp2.exports.fieldGetStaticValue(this.handle, handle);
          return Il2Cpp2.read(handle, this.type);
        }
        /** Sets the value of this field. Thread static or literal values cannot be altered yet. */
        set value(value) {
          if (!this.isStatic) {
            raise(`cannot access instance field ${this.class.type.name}::${this.name} from a class, use an object instead`);
          }
          if (this.isThreadStatic || this.isLiteral) {
            raise(`cannot write the value of field ${this.name} as it's thread static or literal`);
          }
          const handle = (
            // pointer-like values should be passed as-is, but boxed
            // value types (primitives included) must be unboxed first
            value instanceof Il2Cpp2.Object && this.type.class.isValueType ? value.unbox() : value instanceof NativeStruct ? value.handle : value instanceof NativePointer ? value : Il2Cpp2.write(Memory.alloc(this.type.class.valueTypeSize), value, this.type)
          );
          Il2Cpp2.exports.fieldSetStaticValue(this.handle, handle);
        }
        /** */
        toString() {
          return `${this.isThreadStatic ? `[ThreadStatic] ` : ``}${this.isStatic ? `static ` : ``}${this.type.name} ${this.name}${this.isLiteral ? ` = ${this.type.class.isEnum ? Il2Cpp2.read(this.value.handle, this.type.class.baseType) : this.value}` : ``};${this.isThreadStatic || this.isLiteral ? `` : ` // 0x${this.offset.toString(16)}`}`;
        }
        /**
         * @internal
         * Binds the current field to a {@link Il2Cpp.Object} or a
         * {@link Il2Cpp.ValueType} (also known as *instances*), so that it is
         * possible to retrieve its value - see {@link Il2Cpp.Field.value} for
         * details. \
         * Binding a static field is forbidden.
         */
        bind(instance) {
          if (this.isStatic) {
            raise(`cannot bind static field ${this.class.type.name}::${this.name} to an instance`);
          }
          const offset = this.offset - (instance instanceof Il2Cpp2.ValueType ? Il2Cpp2.Object.headerSize : 0);
          return new Proxy(this, {
            get(target, property) {
              if (property == "value") {
                return Il2Cpp2.read(instance.handle.add(offset), target.type);
              }
              return Reflect.get(target, property);
            },
            set(target, property, value) {
              if (property == "value") {
                Il2Cpp2.write(instance.handle.add(offset), value, target.type);
                return true;
              }
              return Reflect.set(target, property, value);
            }
          });
        }
      }
      __decorate([
        lazy
      ], Field.prototype, "class", null);
      __decorate([
        lazy
      ], Field.prototype, "flags", null);
      __decorate([
        lazy
      ], Field.prototype, "isLiteral", null);
      __decorate([
        lazy
      ], Field.prototype, "isStatic", null);
      __decorate([
        lazy
      ], Field.prototype, "isThreadStatic", null);
      __decorate([
        lazy
      ], Field.prototype, "modifier", null);
      __decorate([
        lazy
      ], Field.prototype, "name", null);
      __decorate([
        lazy
      ], Field.prototype, "offset", null);
      __decorate([
        lazy
      ], Field.prototype, "type", null);
      Il2Cpp2.Field = Field;
    })(Il2Cpp || (Il2Cpp = {}));
    var Il2Cpp;
    (function(Il2Cpp2) {
      class GCHandle {
        handle;
        /** @internal */
        constructor(handle) {
          this.handle = handle;
        }
        /** Gets the object associated to this handle. */
        get target() {
          return new Il2Cpp2.Object(Il2Cpp2.exports.gcHandleGetTarget(this.handle)).asNullable();
        }
        /** Frees this handle. */
        free() {
          return Il2Cpp2.exports.gcHandleFree(this.handle);
        }
      }
      Il2Cpp2.GCHandle = GCHandle;
    })(Il2Cpp || (Il2Cpp = {}));
    var Il2Cpp;
    (function(Il2Cpp2) {
      let Image = class Image extends NativeStruct {
        /** Gets the assembly in which the current image is defined. */
        get assembly() {
          return new Il2Cpp2.Assembly(Il2Cpp2.exports.imageGetAssembly(this));
        }
        /** Gets the amount of classes defined in this image. */
        get classCount() {
          if (Il2Cpp2.unityVersionIsBelow201830) {
            return this.classes.length;
          } else {
            return Il2Cpp2.exports.imageGetClassCount(this);
          }
        }
        /** Gets the classes defined in this image. */
        get classes() {
          if (Il2Cpp2.unityVersionIsBelow201830) {
            const types = this.assembly.object.method("GetTypes").invoke(false);
            const classes = globalThis.Array.from(types, (_) => new Il2Cpp2.Class(Il2Cpp2.exports.classFromObject(_)));
            const Module = this.tryClass("<Module>");
            if (Module) {
              classes.unshift(Module);
            }
            return classes;
          } else {
            return globalThis.Array.from(globalThis.Array(this.classCount), (_, i) => new Il2Cpp2.Class(Il2Cpp2.exports.imageGetClass(this, i)));
          }
        }
        /** Gets the name of this image. */
        get name() {
          return Il2Cpp2.exports.imageGetName(this).readUtf8String();
        }
        /** Gets the class with the specified name defined in this image. */
        class(name) {
          return this.tryClass(name) ?? raise(`couldn't find class ${name} in assembly ${this.name}`);
        }
        /** Gets the class with the specified name defined in this image. */
        tryClass(name) {
          const dotIndex = name.lastIndexOf(".");
          const classNamespace = Memory.allocUtf8String(dotIndex == -1 ? "" : name.slice(0, dotIndex));
          const className = Memory.allocUtf8String(name.slice(dotIndex + 1));
          return new Il2Cpp2.Class(Il2Cpp2.exports.classFromName(this, classNamespace, className)).asNullable();
        }
      };
      __decorate([
        lazy
      ], Image.prototype, "assembly", null);
      __decorate([
        lazy
      ], Image.prototype, "classCount", null);
      __decorate([
        lazy
      ], Image.prototype, "classes", null);
      __decorate([
        lazy
      ], Image.prototype, "name", null);
      Image = __decorate([
        recycle
      ], Image);
      Il2Cpp2.Image = Image;
      getter(Il2Cpp2, "corlib", () => {
        return new Il2Cpp2.Image(Il2Cpp2.exports.getCorlib());
      }, lazy);
    })(Il2Cpp || (Il2Cpp = {}));
    var Il2Cpp;
    (function(Il2Cpp2) {
      class MemorySnapshot extends NativeStruct {
        /** Captures a memory snapshot. */
        static capture() {
          return new Il2Cpp2.MemorySnapshot();
        }
        /** Creates a memory snapshot with the given handle. */
        constructor(handle = Il2Cpp2.exports.memorySnapshotCapture()) {
          super(handle);
        }
        /** Gets any initialized class. */
        get classes() {
          return readNativeIterator((_) => Il2Cpp2.exports.memorySnapshotGetClasses(this, _)).map((_) => new Il2Cpp2.Class(_));
        }
        /** Gets the objects tracked by this memory snapshot. */
        get objects() {
          return readNativeList((_) => Il2Cpp2.exports.memorySnapshotGetObjects(this, _)).filter((_) => !_.isNull()).map((_) => new Il2Cpp2.Object(_));
        }
        /** Frees this memory snapshot. */
        free() {
          Il2Cpp2.exports.memorySnapshotFree(this);
        }
      }
      __decorate([
        lazy
      ], MemorySnapshot.prototype, "classes", null);
      __decorate([
        lazy
      ], MemorySnapshot.prototype, "objects", null);
      Il2Cpp2.MemorySnapshot = MemorySnapshot;
      function memorySnapshot(block) {
        const memorySnapshot2 = Il2Cpp2.MemorySnapshot.capture();
        const result = block(memorySnapshot2);
        memorySnapshot2.free();
        return result;
      }
      Il2Cpp2.memorySnapshot = memorySnapshot;
    })(Il2Cpp || (Il2Cpp = {}));
    var Il2Cpp;
    (function(Il2Cpp2) {
      class Method extends NativeStruct {
        /** Gets the class in which this method is defined. */
        get class() {
          return new Il2Cpp2.Class(Il2Cpp2.exports.methodGetClass(this));
        }
        /** Gets the flags of the current method. */
        get flags() {
          return Il2Cpp2.exports.methodGetFlags(this, NULL);
        }
        /** Gets the implementation flags of the current method. */
        get implementationFlags() {
          const implementationFlagsPointer = Memory.alloc(Process.pointerSize);
          Il2Cpp2.exports.methodGetFlags(this, implementationFlagsPointer);
          return implementationFlagsPointer.readU32();
        }
        /** */
        get fridaSignature() {
          const types = [];
          for (const parameter of this.parameters) {
            types.push(parameter.type.fridaAlias);
          }
          if (!this.isStatic || Il2Cpp2.unityVersionIsBelow201830) {
            types.unshift("pointer");
          }
          if (this.isInflated) {
            types.push("pointer");
          }
          return types;
        }
        /** Gets the generic parameters of this generic method. */
        get generics() {
          if (!this.isGeneric && !this.isInflated) {
            return [];
          }
          const types = this.object.method("GetGenericArguments").invoke();
          return globalThis.Array.from(types).map((_) => new Il2Cpp2.Class(Il2Cpp2.exports.classFromObject(_)));
        }
        /** Determines whether this method is external. */
        get isExternal() {
          return (this.implementationFlags & 4096) != 0;
        }
        /** Determines whether this method is generic. */
        get isGeneric() {
          return !!Il2Cpp2.exports.methodIsGeneric(this);
        }
        /** Determines whether this method is inflated (generic with a concrete type parameter). */
        get isInflated() {
          return !!Il2Cpp2.exports.methodIsInflated(this);
        }
        /** Determines whether this method is static. */
        get isStatic() {
          return !Il2Cpp2.exports.methodIsInstance(this);
        }
        /** Determines whether this method is synchronized. */
        get isSynchronized() {
          return (this.implementationFlags & 32) != 0;
        }
        /** Gets the access modifier of this method. */
        get modifier() {
          switch (this.flags & 7) {
            case 1:
              return "private";
            case 2:
              return "private protected";
            case 3:
              return "internal";
            case 4:
              return "protected";
            case 5:
              return "protected internal";
            case 6:
              return "public";
          }
        }
        /** Gets the name of this method. */
        get name() {
          return Il2Cpp2.exports.methodGetName(this).readUtf8String();
        }
        /** @internal */
        get nativeFunction() {
          return new NativeFunction(this.virtualAddress, this.returnType.fridaAlias, this.fridaSignature);
        }
        /** Gets the encompassing object of the current method. */
        get object() {
          return new Il2Cpp2.Object(Il2Cpp2.exports.methodGetObject(this, NULL));
        }
        /** Gets the amount of parameters of this method. */
        get parameterCount() {
          return Il2Cpp2.exports.methodGetParameterCount(this);
        }
        /** Gets the parameters of this method. */
        get parameters() {
          return globalThis.Array.from(globalThis.Array(this.parameterCount), (_, i) => {
            const parameterName = Il2Cpp2.exports.methodGetParameterName(this, i).readUtf8String();
            const parameterType = Il2Cpp2.exports.methodGetParameterType(this, i);
            return new Il2Cpp2.Parameter(parameterName, i, new Il2Cpp2.Type(parameterType));
          });
        }
        /** Gets the relative virtual address (RVA) of this method. */
        get relativeVirtualAddress() {
          return this.virtualAddress.sub(Il2Cpp2.module.base);
        }
        /** Gets the return type of this method. */
        get returnType() {
          return new Il2Cpp2.Type(Il2Cpp2.exports.methodGetReturnType(this));
        }
        /** Gets the virtual address (VA) of this method. */
        get virtualAddress() {
          const FilterTypeName = Il2Cpp2.corlib.class("System.Reflection.Module").initialize().field("FilterTypeName").value;
          const FilterTypeNameMethodPointer = FilterTypeName.field("method_ptr").value;
          const FilterTypeNameMethod = FilterTypeName.field("method").value;
          const offset = FilterTypeNameMethod.offsetOf((_) => _.readPointer().equals(FilterTypeNameMethodPointer)) ?? raise("couldn't find the virtual address offset in the native method struct");
          getter(Il2Cpp2.Method.prototype, "virtualAddress", function() {
            return this.handle.add(offset).readPointer();
          }, lazy);
          Il2Cpp2.corlib.class("System.Reflection.Module").method(".cctor").invoke();
          return this.virtualAddress;
        }
        /** Replaces the body of this method. */
        set implementation(block) {
          try {
            Interceptor.replace(this.virtualAddress, this.wrap(block));
          } catch (e) {
            switch (e.message) {
              case "access violation accessing 0x0":
                raise(`couldn't set implementation for method ${this.name} as it has a NULL virtual address`);
              case /unable to intercept function at \w+; please file a bug/.exec(e.message)?.input:
                warn(`couldn't set implementation for method ${this.name} as it may be a thunk`);
                break;
              case "already replaced this function":
                warn(`couldn't set implementation for method ${this.name} as it has already been replaced by a thunk`);
                break;
              default:
                throw e;
            }
          }
        }
        /** Creates a generic instance of the current generic method. */
        inflate(...classes) {
          if (!this.isGeneric || this.generics.length != classes.length) {
            for (const method of this.overloads()) {
              if (method.isGeneric && method.generics.length == classes.length) {
                return method.inflate(...classes);
              }
            }
            raise(`could not find inflatable signature of method ${this.name} with ${classes.length} generic parameter(s)`);
          }
          const types = classes.map((_) => _.type.object);
          const typeArray = Il2Cpp2.array(Il2Cpp2.corlib.class("System.Type"), types);
          const inflatedMethodObject = this.object.method("MakeGenericMethod", 1).invoke(typeArray);
          return new Il2Cpp2.Method(inflatedMethodObject.field("mhandle").value);
        }
        /** Invokes this method. */
        invoke(...parameters) {
          if (!this.isStatic) {
            raise(`cannot invoke non-static method ${this.name} as it must be invoked throught a Il2Cpp.Object, not a Il2Cpp.Class`);
          }
          return this.invokeRaw(NULL, ...parameters);
        }
        /** @internal */
        invokeRaw(instance, ...parameters) {
          const allocatedParameters = parameters.map(Il2Cpp2.toFridaValue);
          if (!this.isStatic || Il2Cpp2.unityVersionIsBelow201830) {
            allocatedParameters.unshift(instance);
          }
          if (this.isInflated) {
            allocatedParameters.push(this.handle);
          }
          try {
            const returnValue = this.nativeFunction(...allocatedParameters);
            return Il2Cpp2.fromFridaValue(returnValue, this.returnType);
          } catch (e) {
            if (e == null) {
              raise("an unexpected native invocation exception occurred, this is due to parameter types mismatch");
            }
            switch (e.message) {
              case "bad argument count":
                raise(`couldn't invoke method ${this.name} as it needs ${this.parameterCount} parameter(s), not ${parameters.length}`);
              case "expected a pointer":
              case "expected number":
              case "expected array with fields":
                raise(`couldn't invoke method ${this.name} using incorrect parameter types`);
            }
            throw e;
          }
        }
        /** Gets the overloaded method with the given parameter types. */
        overload(...typeNamesOrClasses) {
          const method = this.tryOverload(...typeNamesOrClasses);
          return method ?? raise(`couldn't find overloaded method ${this.name}(${typeNamesOrClasses.map((_) => _ instanceof Il2Cpp2.Class ? _.type.name : _)})`);
        }
        /** @internal */
        *overloads() {
          for (const klass of this.class.hierarchy()) {
            for (const method of klass.methods) {
              if (this.name == method.name) {
                yield method;
              }
            }
          }
        }
        /** Gets the parameter with the given name. */
        parameter(name) {
          return this.tryParameter(name) ?? raise(`couldn't find parameter ${name} in method ${this.name}`);
        }
        /** Restore the original method implementation. */
        revert() {
          Interceptor.revert(this.virtualAddress);
          Interceptor.flush();
        }
        /** Gets the overloaded method with the given parameter types. */
        tryOverload(...typeNamesOrClasses) {
          const minScore = typeNamesOrClasses.length * 1;
          const maxScore = typeNamesOrClasses.length * 2;
          let candidate = void 0;
          loop: for (const method of this.overloads()) {
            if (method.parameterCount != typeNamesOrClasses.length)
              continue;
            let score = 0;
            let i = 0;
            for (const parameter of method.parameters) {
              const desiredTypeNameOrClass = typeNamesOrClasses[i];
              if (desiredTypeNameOrClass instanceof Il2Cpp2.Class) {
                if (parameter.type.is(desiredTypeNameOrClass.type)) {
                  score += 2;
                } else if (parameter.type.class.isAssignableFrom(desiredTypeNameOrClass)) {
                  score += 1;
                } else {
                  continue loop;
                }
              } else if (parameter.type.name == desiredTypeNameOrClass) {
                score += 2;
              } else {
                continue loop;
              }
              i++;
            }
            if (score < minScore) {
              continue;
            } else if (score == maxScore) {
              return method;
            } else if (candidate == void 0 || score > candidate[0]) {
              candidate = [score, method];
            } else if (score == candidate[0]) {
              let i2 = 0;
              for (const parameter of candidate[1].parameters) {
                if (parameter.type.class.isAssignableFrom(method.parameters[i2].type.class)) {
                  candidate = [score, method];
                  continue loop;
                }
                i2++;
              }
            }
          }
          return candidate?.[1];
        }
        /** Gets the parameter with the given name. */
        tryParameter(name) {
          return this.parameters.find((_) => _.name == name);
        }
        /** */
        toString() {
          return `${this.isStatic ? `static ` : ``}${this.returnType.name} ${this.name}${this.generics.length > 0 ? `<${this.generics.map((_) => _.type.name).join(",")}>` : ""}(${this.parameters.join(`, `)});${this.virtualAddress.isNull() ? `` : ` // 0x${this.relativeVirtualAddress.toString(16).padStart(8, `0`)}`}`;
        }
        /**
         * @internal
         * Binds the current method to a {@link Il2Cpp.Object} or a
         * {@link Il2Cpp.ValueType} (also known as *instances*), so that it is
         * possible to invoke it - see {@link Il2Cpp.Method.invoke} for
         * details. \
         * Binding a static method is forbidden.
         */
        bind(instance) {
          if (this.isStatic) {
            raise(`cannot bind static method ${this.class.type.name}::${this.name} to an instance`);
          }
          return new Proxy(this, {
            get(target, property, receiver) {
              switch (property) {
                case "invoke":
                  const handle = instance instanceof Il2Cpp2.ValueType ? target.class.isValueType ? instance.handle.sub(structMethodsRequireObjectInstances() ? Il2Cpp2.Object.headerSize : 0) : raise(`cannot invoke method ${target.class.type.name}::${target.name} against a value type, you must box it first`) : target.class.isValueType ? instance.handle.add(structMethodsRequireObjectInstances() ? 0 : Il2Cpp2.Object.headerSize) : instance.handle;
                  return target.invokeRaw.bind(target, handle);
                case "overloads":
                  return function* () {
                    for (const method of target[property]()) {
                      if (!method.isStatic) {
                        yield method;
                      }
                    }
                  };
                case "inflate":
                case "overload":
                case "tryOverload":
                  const member = Reflect.get(target, property).bind(receiver);
                  return function(...args) {
                    return member(...args)?.bind(instance);
                  };
              }
              return Reflect.get(target, property);
            }
          });
        }
        /** @internal */
        wrap(block) {
          const startIndex = +!this.isStatic | +Il2Cpp2.unityVersionIsBelow201830;
          return new NativeCallback((...args) => {
            const thisObject = this.isStatic ? this.class : this.class.isValueType ? new Il2Cpp2.ValueType(args[0].add(structMethodsRequireObjectInstances() ? Il2Cpp2.Object.headerSize : 0), this.class.type) : new Il2Cpp2.Object(args[0]);
            const parameters = this.parameters.map((_, i) => Il2Cpp2.fromFridaValue(args[i + startIndex], _.type));
            const result = block.call(thisObject, ...parameters);
            return Il2Cpp2.toFridaValue(result);
          }, this.returnType.fridaAlias, this.fridaSignature);
        }
      }
      __decorate([
        lazy
      ], Method.prototype, "class", null);
      __decorate([
        lazy
      ], Method.prototype, "flags", null);
      __decorate([
        lazy
      ], Method.prototype, "implementationFlags", null);
      __decorate([
        lazy
      ], Method.prototype, "fridaSignature", null);
      __decorate([
        lazy
      ], Method.prototype, "generics", null);
      __decorate([
        lazy
      ], Method.prototype, "isExternal", null);
      __decorate([
        lazy
      ], Method.prototype, "isGeneric", null);
      __decorate([
        lazy
      ], Method.prototype, "isInflated", null);
      __decorate([
        lazy
      ], Method.prototype, "isStatic", null);
      __decorate([
        lazy
      ], Method.prototype, "isSynchronized", null);
      __decorate([
        lazy
      ], Method.prototype, "modifier", null);
      __decorate([
        lazy
      ], Method.prototype, "name", null);
      __decorate([
        lazy
      ], Method.prototype, "nativeFunction", null);
      __decorate([
        lazy
      ], Method.prototype, "object", null);
      __decorate([
        lazy
      ], Method.prototype, "parameterCount", null);
      __decorate([
        lazy
      ], Method.prototype, "parameters", null);
      __decorate([
        lazy
      ], Method.prototype, "relativeVirtualAddress", null);
      __decorate([
        lazy
      ], Method.prototype, "returnType", null);
      Il2Cpp2.Method = Method;
      let structMethodsRequireObjectInstances = () => {
        const object = Il2Cpp2.corlib.class("System.Int64").alloc();
        object.field("m_value").value = 3735928559;
        const result = object.method("Equals", 1).overload(object.class).invokeRaw(object, 3735928559);
        return (structMethodsRequireObjectInstances = () => result)();
      };
    })(Il2Cpp || (Il2Cpp = {}));
    var Il2Cpp;
    (function(Il2Cpp2) {
      class Object2 extends NativeStruct {
        /** Gets the Il2CppObject struct size, possibly equal to `Process.pointerSize * 2`. */
        static get headerSize() {
          return Il2Cpp2.corlib.class("System.Object").instanceSize;
        }
        /**
         * Returns the same object, but having its parent class as class.
         * It basically is the C# `base` keyword, so that parent members can be
         * accessed.
         *
         * **Example** \
         * Consider the following classes:
         * ```csharp
         * class Foo
         * {
         *     int foo()
         *     {
         *          return 1;
         *     }
         * }
         * class Bar : Foo
         * {
         *     new int foo()
         *     {
         *          return 2;
         *     }
         * }
         * ```
         * then:
         * ```ts
         * const Bar: Il2Cpp.Class = ...;
         * const bar = Bar.new();
         *
         * console.log(bar.foo()); // 2
         * console.log(bar.base.foo()); // 1
         * ```
         */
        get base() {
          if (this.class.parent == null) {
            raise(`class ${this.class.type.name} has no parent`);
          }
          return new Proxy(this, {
            get(target, property, receiver) {
              if (property == "class") {
                return Reflect.get(target, property).parent;
              } else if (property == "base") {
                return Reflect.getOwnPropertyDescriptor(Il2Cpp2.Object.prototype, property).get.bind(receiver)();
              }
              return Reflect.get(target, property);
            }
          });
        }
        /** Gets the class of this object. */
        get class() {
          return new Il2Cpp2.Class(Il2Cpp2.exports.objectGetClass(this));
        }
        /** Returns a monitor for this object. */
        get monitor() {
          return new Il2Cpp2.Object.Monitor(this);
        }
        /** Gets the size of the current object. */
        get size() {
          return Il2Cpp2.exports.objectGetSize(this);
        }
        /** Gets the non-static field with the given name of the current class hierarchy. */
        field(name) {
          return this.tryField(name) ?? raise(`couldn't find non-static field ${name} in hierarchy of class ${this.class.type.name}`);
        }
        /** Gets the non-static method with the given name (and optionally parameter count) of the current class hierarchy. */
        method(name, parameterCount = -1) {
          return this.tryMethod(name, parameterCount) ?? raise(`couldn't find non-static method ${name} in hierarchy of class ${this.class.type.name}`);
        }
        /** Creates a reference to this object. */
        ref(pin) {
          return new Il2Cpp2.GCHandle(Il2Cpp2.exports.gcHandleNew(this, +pin));
        }
        /** Gets the correct virtual method from the given virtual method. */
        virtualMethod(method) {
          return new Il2Cpp2.Method(Il2Cpp2.exports.objectGetVirtualMethod(this, method)).bind(this);
        }
        /** Gets the non-static field with the given name of the current class hierarchy, if it exists. */
        tryField(name) {
          const field = this.class.tryField(name);
          if (field?.isStatic) {
            for (const klass of this.class.hierarchy({ includeCurrent: false })) {
              for (const field2 of klass.fields) {
                if (field2.name == name && !field2.isStatic) {
                  return field2.bind(this);
                }
              }
            }
            return void 0;
          }
          return field?.bind(this);
        }
        /** Gets the non-static method with the given name (and optionally parameter count) of the current class hierarchy, if it exists. */
        tryMethod(name, parameterCount = -1) {
          const method = this.class.tryMethod(name, parameterCount);
          if (method?.isStatic) {
            for (const klass of this.class.hierarchy()) {
              for (const method2 of klass.methods) {
                if (method2.name == name && !method2.isStatic && (parameterCount < 0 || method2.parameterCount == parameterCount)) {
                  return method2.bind(this);
                }
              }
            }
            return void 0;
          }
          return method?.bind(this);
        }
        /** */
        toString() {
          try {
            return this.isNull() ? "null" : this.method("ToString", 0).invoke().content ?? "null";
          } catch (error) {
            return "Error: ToString failed";
          }
        }
        /** Unboxes the value type (either a primitive, a struct or an enum) out of this object. */
        unbox() {
          return this.class.isValueType ? new Il2Cpp2.ValueType(Il2Cpp2.exports.objectUnbox(this), this.class.type) : raise(`couldn't unbox instances of ${this.class.type.name} as they are not value types`);
        }
        /** Creates a weak reference to this object. */
        weakRef(trackResurrection) {
          return new Il2Cpp2.GCHandle(Il2Cpp2.exports.gcHandleNewWeakRef(this, +trackResurrection));
        }
      }
      __decorate([
        lazy
      ], Object2.prototype, "class", null);
      __decorate([
        lazy
      ], Object2.prototype, "size", null);
      __decorate([
        lazy
      ], Object2, "headerSize", null);
      Il2Cpp2.Object = Object2;
      (function(Object3) {
        class Monitor {
          handle;
          /** @internal */
          constructor(handle) {
            this.handle = handle;
          }
          /** Acquires an exclusive lock on the current object. */
          enter() {
            return Il2Cpp2.exports.monitorEnter(this.handle);
          }
          /** Release an exclusive lock on the current object. */
          exit() {
            return Il2Cpp2.exports.monitorExit(this.handle);
          }
          /** Notifies a thread in the waiting queue of a change in the locked object's state. */
          pulse() {
            return Il2Cpp2.exports.monitorPulse(this.handle);
          }
          /** Notifies all waiting threads of a change in the object's state. */
          pulseAll() {
            return Il2Cpp2.exports.monitorPulseAll(this.handle);
          }
          /** Attempts to acquire an exclusive lock on the current object. */
          tryEnter(timeout) {
            return !!Il2Cpp2.exports.monitorTryEnter(this.handle, timeout);
          }
          /** Releases the lock on an object and attempts to block the current thread until it reacquires the lock. */
          tryWait(timeout) {
            return !!Il2Cpp2.exports.monitorTryWait(this.handle, timeout);
          }
          /** Releases the lock on an object and blocks the current thread until it reacquires the lock. */
          wait() {
            return Il2Cpp2.exports.monitorWait(this.handle);
          }
        }
        Object3.Monitor = Monitor;
      })(Object2 = Il2Cpp2.Object || (Il2Cpp2.Object = {}));
    })(Il2Cpp || (Il2Cpp = {}));
    var Il2Cpp;
    (function(Il2Cpp2) {
      class Parameter {
        /** Name of this parameter. */
        name;
        /** Position of this parameter. */
        position;
        /** Type of this parameter. */
        type;
        constructor(name, position, type) {
          this.name = name;
          this.position = position;
          this.type = type;
        }
        /** */
        toString() {
          return `${this.type.name} ${this.name}`;
        }
      }
      Il2Cpp2.Parameter = Parameter;
    })(Il2Cpp || (Il2Cpp = {}));
    var Il2Cpp;
    (function(Il2Cpp2) {
      class Pointer extends NativeStruct {
        type;
        constructor(handle, type) {
          super(handle);
          this.type = type;
        }
        /** Gets the element at the given index. */
        get(index) {
          return Il2Cpp2.read(this.handle.add(index * this.type.class.arrayElementSize), this.type);
        }
        /** Reads the given amount of elements starting at the given offset. */
        read(length, offset = 0) {
          const values = new globalThis.Array(length);
          for (let i = 0; i < length; i++) {
            values[i] = this.get(i + offset);
          }
          return values;
        }
        /** Sets the given element at the given index */
        set(index, value) {
          Il2Cpp2.write(this.handle.add(index * this.type.class.arrayElementSize), value, this.type);
        }
        /** */
        toString() {
          return this.handle.toString();
        }
        /** Writes the given elements starting at the given index. */
        write(values, offset = 0) {
          for (let i = 0; i < values.length; i++) {
            this.set(i + offset, values[i]);
          }
        }
      }
      Il2Cpp2.Pointer = Pointer;
    })(Il2Cpp || (Il2Cpp = {}));
    var Il2Cpp;
    (function(Il2Cpp2) {
      class Reference extends NativeStruct {
        type;
        constructor(handle, type) {
          super(handle);
          this.type = type;
        }
        /** Gets the element referenced by the current reference. */
        get value() {
          return Il2Cpp2.read(this.handle, this.type);
        }
        /** Sets the element referenced by the current reference. */
        set value(value) {
          Il2Cpp2.write(this.handle, value, this.type);
        }
        /** */
        toString() {
          return this.isNull() ? "null" : `->${this.value}`;
        }
      }
      Il2Cpp2.Reference = Reference;
      function reference(value, type) {
        const handle = Memory.alloc(Process.pointerSize);
        switch (typeof value) {
          case "boolean":
            return new Il2Cpp2.Reference(handle.writeS8(+value), Il2Cpp2.corlib.class("System.Boolean").type);
          case "number":
            switch (type?.enumValue) {
              case Il2Cpp2.Type.Enum.UBYTE:
                return new Il2Cpp2.Reference(handle.writeU8(value), type);
              case Il2Cpp2.Type.Enum.BYTE:
                return new Il2Cpp2.Reference(handle.writeS8(value), type);
              case Il2Cpp2.Type.Enum.CHAR:
              case Il2Cpp2.Type.Enum.USHORT:
                return new Il2Cpp2.Reference(handle.writeU16(value), type);
              case Il2Cpp2.Type.Enum.SHORT:
                return new Il2Cpp2.Reference(handle.writeS16(value), type);
              case Il2Cpp2.Type.Enum.UINT:
                return new Il2Cpp2.Reference(handle.writeU32(value), type);
              case Il2Cpp2.Type.Enum.INT:
                return new Il2Cpp2.Reference(handle.writeS32(value), type);
              case Il2Cpp2.Type.Enum.ULONG:
                return new Il2Cpp2.Reference(handle.writeU64(value), type);
              case Il2Cpp2.Type.Enum.LONG:
                return new Il2Cpp2.Reference(handle.writeS64(value), type);
              case Il2Cpp2.Type.Enum.FLOAT:
                return new Il2Cpp2.Reference(handle.writeFloat(value), type);
              case Il2Cpp2.Type.Enum.DOUBLE:
                return new Il2Cpp2.Reference(handle.writeDouble(value), type);
            }
          case "object":
            if (value instanceof Il2Cpp2.ValueType || value instanceof Il2Cpp2.Pointer) {
              return new Il2Cpp2.Reference(value.handle, value.type);
            } else if (value instanceof Il2Cpp2.Object) {
              return new Il2Cpp2.Reference(handle.writePointer(value), value.class.type);
            } else if (value instanceof Il2Cpp2.String || value instanceof Il2Cpp2.Array) {
              return new Il2Cpp2.Reference(handle.writePointer(value), value.object.class.type);
            } else if (value instanceof NativePointer) {
              switch (type?.enumValue) {
                case Il2Cpp2.Type.Enum.NUINT:
                case Il2Cpp2.Type.Enum.NINT:
                  return new Il2Cpp2.Reference(handle.writePointer(value), type);
              }
            } else if (value instanceof Int64) {
              return new Il2Cpp2.Reference(handle.writeS64(value), Il2Cpp2.corlib.class("System.Int64").type);
            } else if (value instanceof UInt64) {
              return new Il2Cpp2.Reference(handle.writeU64(value), Il2Cpp2.corlib.class("System.UInt64").type);
            }
          default:
            raise(`couldn't create a reference to ${value} using an unhandled type ${type?.name}`);
        }
      }
      Il2Cpp2.reference = reference;
    })(Il2Cpp || (Il2Cpp = {}));
    var Il2Cpp;
    (function(Il2Cpp2) {
      class String extends NativeStruct {
        /** Gets the content of this string. */
        get content() {
          return Il2Cpp2.exports.stringGetChars(this).readUtf16String(this.length);
        }
        /** @unsafe Sets the content of this string - it may write out of bounds! */
        set content(value) {
          const offset = Il2Cpp2.string("vfsfitvnm").handle.offsetOf((_) => _.readInt() == 9) ?? raise("couldn't find the length offset in the native string struct");
          globalThis.Object.defineProperty(Il2Cpp2.String.prototype, "content", {
            set(value2) {
              Il2Cpp2.exports.stringGetChars(this).writeUtf16String(value2 ?? "");
              this.handle.add(offset).writeS32(value2?.length ?? 0);
            }
          });
          this.content = value;
        }
        /** Gets the length of this string. */
        get length() {
          return Il2Cpp2.exports.stringGetLength(this);
        }
        /** Gets the encompassing object of the current string. */
        get object() {
          return new Il2Cpp2.Object(this);
        }
        /** */
        toString() {
          return this.isNull() ? "null" : `"${this.content}"`;
        }
      }
      Il2Cpp2.String = String;
      function string(content) {
        return new Il2Cpp2.String(Il2Cpp2.exports.stringNew(Memory.allocUtf8String(content ?? "")));
      }
      Il2Cpp2.string = string;
    })(Il2Cpp || (Il2Cpp = {}));
    var Il2Cpp;
    (function(Il2Cpp2) {
      class Thread extends NativeStruct {
        /** Gets the native id of the current thread. */
        get id() {
          let get = function() {
            return this.internal.field("thread_id").value.toNumber();
          };
          if (Process.platform != "windows") {
            const currentThreadId = Process.getCurrentThreadId();
            const currentPosixThread = ptr(get.apply(Il2Cpp2.currentThread));
            const offset = currentPosixThread.offsetOf((_) => _.readS32() == currentThreadId, 1024) ?? raise(`couldn't find the offset for determining the kernel id of a posix thread`);
            const _get = get;
            get = function() {
              return ptr(_get.apply(this)).add(offset).readS32();
            };
          }
          getter(Il2Cpp2.Thread.prototype, "id", get, lazy);
          return this.id;
        }
        /** Gets the encompassing internal object (System.Threding.InternalThreead) of the current thread. */
        get internal() {
          return this.object.tryField("internal_thread")?.value ?? this.object;
        }
        /** Determines whether the current thread is the garbage collector finalizer one. */
        get isFinalizer() {
          return !Il2Cpp2.exports.threadIsVm(this);
        }
        /** Gets the managed id of the current thread. */
        get managedId() {
          return this.object.method("get_ManagedThreadId").invoke();
        }
        /** Gets the encompassing object of the current thread. */
        get object() {
          return new Il2Cpp2.Object(this);
        }
        /** @internal */
        get staticData() {
          return this.internal.field("static_data").value;
        }
        /** @internal */
        get synchronizationContext() {
          const get_ExecutionContext = this.object.tryMethod("GetMutableExecutionContext") ?? this.object.method("get_ExecutionContext");
          const executionContext = get_ExecutionContext.invoke();
          const synchronizationContext = executionContext.tryField("_syncContext")?.value ?? executionContext.tryMethod("get_SynchronizationContext")?.invoke() ?? this.tryLocalValue(Il2Cpp2.corlib.class("System.Threading.SynchronizationContext"));
          return synchronizationContext?.asNullable() ?? null;
        }
        /** Detaches the thread from the application domain. */
        detach() {
          return Il2Cpp2.exports.threadDetach(this);
        }
        /** Schedules a callback on the current thread. */
        schedule(block) {
          const Post = this.synchronizationContext?.tryMethod("Post");
          if (Post == null) {
            return Process.runOnThread(this.id, block);
          }
          return new Promise((resolve) => {
            const delegate = Il2Cpp2.delegate(Il2Cpp2.corlib.class("System.Threading.SendOrPostCallback"), () => {
              const result = block();
              setImmediate(() => resolve(result));
            });
            Script.bindWeak(globalThis, () => {
              delegate.field("method_ptr").value = delegate.field("invoke_impl").value = Il2Cpp2.exports.domainGet;
            });
            Post.invoke(delegate, NULL);
          });
        }
        /** @internal */
        tryLocalValue(klass) {
          for (let i = 0; i < 16; i++) {
            const base = this.staticData.add(i * Process.pointerSize).readPointer();
            if (!base.isNull()) {
              const object = new Il2Cpp2.Object(base.readPointer()).asNullable();
              if (object?.class?.isSubclassOf(klass, false)) {
                return object;
              }
            }
          }
        }
      }
      __decorate([
        lazy
      ], Thread.prototype, "internal", null);
      __decorate([
        lazy
      ], Thread.prototype, "isFinalizer", null);
      __decorate([
        lazy
      ], Thread.prototype, "managedId", null);
      __decorate([
        lazy
      ], Thread.prototype, "object", null);
      __decorate([
        lazy
      ], Thread.prototype, "staticData", null);
      __decorate([
        lazy
      ], Thread.prototype, "synchronizationContext", null);
      Il2Cpp2.Thread = Thread;
      getter(Il2Cpp2, "attachedThreads", () => {
        if (Il2Cpp2.exports.threadGetAttachedThreads.isNull()) {
          const currentThreadHandle = Il2Cpp2.currentThread?.handle ?? raise("Current thread is not attached to IL2CPP");
          const pattern = currentThreadHandle.toMatchPattern();
          const threads = [];
          for (const range of Process.enumerateRanges("rw-")) {
            if (range.file == void 0) {
              let matches;
              try {
                matches = Memory.scanSync(range.base, range.size, pattern);
              } catch (_) {
                continue;
              }
              if (matches.length == 1) {
                try {
                  while (true) {
                    const handle = matches[0].address.sub(matches[0].size * threads.length).readPointer();
                    if (handle.isNull() || !handle.readPointer().equals(currentThreadHandle.readPointer())) {
                      break;
                    }
                    threads.unshift(new Il2Cpp2.Thread(handle));
                  }
                } catch (_) {
                }
                break;
              }
            }
          }
          return threads;
        }
        return readNativeList(Il2Cpp2.exports.threadGetAttachedThreads).map((_) => new Il2Cpp2.Thread(_));
      });
      getter(Il2Cpp2, "currentThread", () => {
        return new Il2Cpp2.Thread(Il2Cpp2.exports.threadGetCurrent()).asNullable();
      });
      getter(Il2Cpp2, "mainThread", () => {
        return Il2Cpp2.attachedThreads[0];
      });
    })(Il2Cpp || (Il2Cpp = {}));
    var Il2Cpp;
    (function(Il2Cpp2) {
      let Type = class Type extends NativeStruct {
        /** */
        static get Enum() {
          const _ = (_2, block = (_3) => _3) => block(Il2Cpp2.corlib.class(_2)).type.enumValue;
          const initial = {
            VOID: _("System.Void"),
            BOOLEAN: _("System.Boolean"),
            CHAR: _("System.Char"),
            BYTE: _("System.SByte"),
            UBYTE: _("System.Byte"),
            SHORT: _("System.Int16"),
            USHORT: _("System.UInt16"),
            INT: _("System.Int32"),
            UINT: _("System.UInt32"),
            LONG: _("System.Int64"),
            ULONG: _("System.UInt64"),
            NINT: _("System.IntPtr"),
            NUINT: _("System.UIntPtr"),
            FLOAT: _("System.Single"),
            DOUBLE: _("System.Double"),
            POINTER: _("System.IntPtr", (_2) => _2.field("m_value")),
            VALUE_TYPE: _("System.Decimal"),
            OBJECT: _("System.Object"),
            STRING: _("System.String"),
            CLASS: _("System.Array"),
            ARRAY: _("System.Void", (_2) => _2.arrayClass),
            NARRAY: _("System.Void", (_2) => new Il2Cpp2.Class(Il2Cpp2.exports.classGetArrayClass(_2, 2))),
            GENERIC_INSTANCE: _("System.Int32", (_2) => _2.interfaces.find((_3) => _3.name.endsWith("`1")))
          };
          Reflect.defineProperty(this, "Enum", { value: initial });
          return addFlippedEntries({
            ...initial,
            VAR: _("System.Action`1", (_2) => _2.generics[0]),
            MVAR: _("System.Array", (_2) => _2.method("AsReadOnly", 1).generics[0])
          });
        }
        /** Gets the class of this type. */
        get class() {
          return new Il2Cpp2.Class(Il2Cpp2.exports.typeGetClass(this));
        }
        /** */
        get fridaAlias() {
          function getValueTypeFields(type) {
            const instanceFields = type.class.fields.filter((_) => !_.isStatic);
            return instanceFields.length == 0 ? ["char"] : instanceFields.map((_) => _.type.fridaAlias);
          }
          if (this.isByReference) {
            return "pointer";
          }
          switch (this.enumValue) {
            case Il2Cpp2.Type.Enum.VOID:
              return "void";
            case Il2Cpp2.Type.Enum.BOOLEAN:
              return "bool";
            case Il2Cpp2.Type.Enum.CHAR:
              return "uchar";
            case Il2Cpp2.Type.Enum.BYTE:
              return "int8";
            case Il2Cpp2.Type.Enum.UBYTE:
              return "uint8";
            case Il2Cpp2.Type.Enum.SHORT:
              return "int16";
            case Il2Cpp2.Type.Enum.USHORT:
              return "uint16";
            case Il2Cpp2.Type.Enum.INT:
              return "int32";
            case Il2Cpp2.Type.Enum.UINT:
              return "uint32";
            case Il2Cpp2.Type.Enum.LONG:
              return "int64";
            case Il2Cpp2.Type.Enum.ULONG:
              return "uint64";
            case Il2Cpp2.Type.Enum.FLOAT:
              return "float";
            case Il2Cpp2.Type.Enum.DOUBLE:
              return "double";
            case Il2Cpp2.Type.Enum.NINT:
            case Il2Cpp2.Type.Enum.NUINT:
            case Il2Cpp2.Type.Enum.POINTER:
            case Il2Cpp2.Type.Enum.STRING:
            case Il2Cpp2.Type.Enum.ARRAY:
            case Il2Cpp2.Type.Enum.NARRAY:
              return "pointer";
            case Il2Cpp2.Type.Enum.VALUE_TYPE:
              return this.class.isEnum ? this.class.baseType.fridaAlias : getValueTypeFields(this);
            case Il2Cpp2.Type.Enum.CLASS:
            case Il2Cpp2.Type.Enum.OBJECT:
            case Il2Cpp2.Type.Enum.GENERIC_INSTANCE:
              return this.class.isStruct ? getValueTypeFields(this) : this.class.isEnum ? this.class.baseType.fridaAlias : "pointer";
            default:
              return "pointer";
          }
        }
        /** Determines whether this type is passed by reference. */
        get isByReference() {
          return this.name.endsWith("&");
        }
        /** Determines whether this type is primitive. */
        get isPrimitive() {
          switch (this.enumValue) {
            case Il2Cpp2.Type.Enum.BOOLEAN:
            case Il2Cpp2.Type.Enum.CHAR:
            case Il2Cpp2.Type.Enum.BYTE:
            case Il2Cpp2.Type.Enum.UBYTE:
            case Il2Cpp2.Type.Enum.SHORT:
            case Il2Cpp2.Type.Enum.USHORT:
            case Il2Cpp2.Type.Enum.INT:
            case Il2Cpp2.Type.Enum.UINT:
            case Il2Cpp2.Type.Enum.LONG:
            case Il2Cpp2.Type.Enum.ULONG:
            case Il2Cpp2.Type.Enum.FLOAT:
            case Il2Cpp2.Type.Enum.DOUBLE:
            case Il2Cpp2.Type.Enum.NINT:
            case Il2Cpp2.Type.Enum.NUINT:
              return true;
            default:
              return false;
          }
        }
        /** Gets the name of this type. */
        get name() {
          try {
            const handle = Il2Cpp2.exports.typeGetName(this);
            try {
              return handle.readUtf8String();
            } finally {
              Il2Cpp2.free(handle);
            }
          } catch {
            return "Error: ToString failed";
          }
        }
        /** Gets the encompassing object of the current type. */
        get object() {
          return new Il2Cpp2.Object(Il2Cpp2.exports.typeGetObject(this));
        }
        /** Gets the {@link Il2Cpp.Type.Enum} value of the current type. */
        get enumValue() {
          return Il2Cpp2.exports.typeGetTypeEnum(this);
        }
        is(other) {
          if (Il2Cpp2.exports.typeEquals.isNull()) {
            return this.object.method("Equals").invoke(other.object);
          }
          return !!Il2Cpp2.exports.typeEquals(this, other);
        }
        /** */
        toString() {
          return this.name;
        }
      };
      __decorate([
        lazy
      ], Type.prototype, "class", null);
      __decorate([
        lazy
      ], Type.prototype, "fridaAlias", null);
      __decorate([
        lazy
      ], Type.prototype, "isByReference", null);
      __decorate([
        lazy
      ], Type.prototype, "isPrimitive", null);
      __decorate([
        lazy
      ], Type.prototype, "name", null);
      __decorate([
        lazy
      ], Type.prototype, "object", null);
      __decorate([
        lazy
      ], Type.prototype, "enumValue", null);
      __decorate([
        lazy
      ], Type, "Enum", null);
      Type = __decorate([
        recycle
      ], Type);
      Il2Cpp2.Type = Type;
    })(Il2Cpp || (Il2Cpp = {}));
    var Il2Cpp;
    (function(Il2Cpp2) {
      class ValueType extends NativeStruct {
        type;
        constructor(handle, type) {
          super(handle);
          this.type = type;
        }
        /** Boxes the current value type in a object. */
        box() {
          return new Il2Cpp2.Object(Il2Cpp2.exports.valueTypeBox(this.type.class, this));
        }
        /** Gets the non-static field with the given name of the current class hierarchy. */
        field(name) {
          return this.tryField(name) ?? raise(`couldn't find non-static field ${name} in hierarchy of class ${this.type.name}`);
        }
        /** Gets the non-static method with the given name (and optionally parameter count) of the current class hierarchy. */
        method(name, parameterCount = -1) {
          return this.tryMethod(name, parameterCount) ?? raise(`couldn't find non-static method ${name} in hierarchy of class ${this.type.name}`);
        }
        /** Gets the non-static field with the given name of the current class hierarchy, if it exists. */
        tryField(name) {
          const field = this.type.class.tryField(name);
          if (field?.isStatic) {
            for (const klass of this.type.class.hierarchy()) {
              for (const field2 of klass.fields) {
                if (field2.name == name && !field2.isStatic) {
                  return field2.bind(this);
                }
              }
            }
            return void 0;
          }
          return field?.bind(this);
        }
        /** Gets the non-static method with the given name (and optionally parameter count) of the current class hierarchy, if it exists. */
        tryMethod(name, parameterCount = -1) {
          const method = this.type.class.tryMethod(name, parameterCount);
          if (method?.isStatic) {
            for (const klass of this.type.class.hierarchy()) {
              for (const method2 of klass.methods) {
                if (method2.name == name && !method2.isStatic && (parameterCount < 0 || method2.parameterCount == parameterCount)) {
                  return method2.bind(this);
                }
              }
            }
            return void 0;
          }
          return method?.bind(this);
        }
        /** */
        toString() {
          const ToString = this.method("ToString", 0);
          return this.isNull() ? "null" : (
            // If ToString is defined within a value type class, we can
            // avoid a boxing operation.
            ToString.class.isValueType ? ToString.invoke().content ?? "null" : this.box().toString() ?? "null"
          );
        }
      }
      Il2Cpp2.ValueType = ValueType;
    })(Il2Cpp || (Il2Cpp = {}));
    globalThis.Il2Cpp = Il2Cpp;
    Il2Cpp.$config.exports = {
      il2cpp_init: () => Il2Cpp.module.findExportByName("G_SwUIZnYMx"),
      il2cpp_init_utf16: () => Il2Cpp.module.findExportByName("h_DTGWhqiSE"),
      il2cpp_shutdown: () => Il2Cpp.module.findExportByName("_FdJkrcruRA"),
      il2cpp_set_config_dir: () => Il2Cpp.module.findExportByName("IOIszJqwuid"),
      il2cpp_set_data_dir: () => Il2Cpp.module.findExportByName("HNhjqEpGkbj"),
      il2cpp_set_temp_dir: () => Il2Cpp.module.findExportByName("uoateqanVYM"),
      il2cpp_set_commandline_arguments: () => Il2Cpp.module.findExportByName("OWSlmmsvsCP"),
      il2cpp_set_commandline_arguments_utf16: () => Il2Cpp.module.findExportByName("fwoWBAxAhUK"),
      il2cpp_set_config_utf16: () => Il2Cpp.module.findExportByName("DVjporYXVKl"),
      il2cpp_set_config: () => Il2Cpp.module.findExportByName("eUkCCadjFMN"),
      il2cpp_set_memory_callbacks: () => Il2Cpp.module.findExportByName("CSjxzlKCtKG"),
      il2cpp_memory_pool_set_region_size: () => Il2Cpp.module.findExportByName("eiyWBQsSXxT"),
      il2cpp_memory_pool_get_region_size: () => Il2Cpp.module.findExportByName("PRHEaqXcZsj"),
      il2cpp_get_corlib: () => Il2Cpp.module.findExportByName("wTAKDwxlPrq"),
      il2cpp_add_internal_call: () => Il2Cpp.module.findExportByName("vXPjUruoZrl"),
      il2cpp_resolve_icall: () => Il2Cpp.module.findExportByName("sKoRYPtlJmq"),
      il2cpp_alloc: () => Il2Cpp.module.findExportByName("coRizmWrbwk"),
      il2cpp_free: () => Il2Cpp.module.findExportByName("asZgDWFxduo"),
      il2cpp_array_class_get: () => Il2Cpp.module.findExportByName("gYECzreeHVW"),
      il2cpp_array_length: () => Il2Cpp.module.findExportByName("GIlFPpcxGwk"),
      il2cpp_array_get_byte_length: () => Il2Cpp.module.findExportByName("d_mpuLTtCfO"),
      il2cpp_array_new: () => Il2Cpp.module.findExportByName("AcRcznZVexk"),
      il2cpp_array_new_specific: () => Il2Cpp.module.findExportByName("XhelJchHcGt"),
      il2cpp_array_new_full: () => Il2Cpp.module.findExportByName("CXPOzyNVUGt"),
      il2cpp_bounded_array_class_get: () => Il2Cpp.module.findExportByName("ExAJpikAhCh"),
      il2cpp_array_element_size: () => Il2Cpp.module.findExportByName("FvljPeMUOLp"),
      il2cpp_assembly_get_image: () => Il2Cpp.module.findExportByName("ZWABzAxkJbF"),
      il2cpp_class_for_each: () => Il2Cpp.module.findExportByName("yfRhDLMLQwB"),
      il2cpp_class_enum_basetype: () => Il2Cpp.module.findExportByName("fJycnydtrx_"),
      il2cpp_class_is_inited: () => Il2Cpp.module.findExportByName("RTcRdwuORKK"),
      il2cpp_class_is_generic: () => Il2Cpp.module.findExportByName("WcpbunNeAOp"),
      il2cpp_class_is_inflated: () => Il2Cpp.module.findExportByName("jbCAykarDAQ"),
      il2cpp_class_is_assignable_from: () => Il2Cpp.module.findExportByName("MsVijdkwKgn"),
      il2cpp_class_is_subclass_of: () => Il2Cpp.module.findExportByName("GHPIowILUn_"),
      il2cpp_class_has_parent: () => Il2Cpp.module.findExportByName("JeyamzGlhQG"),
      il2cpp_class_from_il2cpp_type: () => Il2Cpp.module.findExportByName("DORJEyWevXj"),
      il2cpp_class_from_name: () => Il2Cpp.module.findExportByName("WwDoOXXPFW_"),
      il2cpp_class_from_system_type: () => Il2Cpp.module.findExportByName("KyAt_FFupmj"),
      il2cpp_class_get_element_class: () => Il2Cpp.module.findExportByName("tvZKMixONaH"),
      il2cpp_class_get_events: () => Il2Cpp.module.findExportByName("xSLQgByTHDQ"),
      il2cpp_class_get_fields: () => Il2Cpp.module.findExportByName("cDdzmhLcUGh"),
      il2cpp_class_get_nested_types: () => Il2Cpp.module.findExportByName("CVpRLvdMbSB"),
      il2cpp_class_get_interfaces: () => Il2Cpp.module.findExportByName("lmMmfKnnqPR"),
      il2cpp_class_get_properties: () => Il2Cpp.module.findExportByName("xWIzOKNzPtb"),
      il2cpp_class_get_property_from_name: () => Il2Cpp.module.findExportByName("VTCYmjWDNlg"),
      il2cpp_class_get_field_from_name: () => Il2Cpp.module.findExportByName("DJVSWkzmqVk"),
      il2cpp_class_get_methods: () => Il2Cpp.module.findExportByName("nJTkeLaKwcQ"),
      il2cpp_class_get_method_from_name: () => Il2Cpp.module.findExportByName("mvocquBFZOU"),
      il2cpp_class_get_name: () => Il2Cpp.module.findExportByName("qvumZksOZ_y"),
      il2cpp_type_get_name_chunked: () => Il2Cpp.module.findExportByName("RvtzPsR_XTa"),
      il2cpp_class_get_namespace: () => Il2Cpp.module.findExportByName("JDxrr_lJCPD"),
      il2cpp_class_get_parent: () => Il2Cpp.module.findExportByName("sCekjHhEoxA"),
      il2cpp_class_get_declaring_type: () => Il2Cpp.module.findExportByName("GrllW_rKvyn"),
      il2cpp_class_instance_size: () => Il2Cpp.module.findExportByName("HMRFhzwTENM"),
      il2cpp_class_num_fields: () => Il2Cpp.module.findExportByName("EkFTBjJWKMv"),
      il2cpp_class_is_valuetype: () => Il2Cpp.module.findExportByName("kbwbUPoNPhS"),
      il2cpp_class_value_size: () => Il2Cpp.module.findExportByName("elFhHdHhxmG"),
      il2cpp_class_is_blittable: () => Il2Cpp.module.findExportByName("tuvLbWVhFGp"),
      il2cpp_class_get_flags: () => Il2Cpp.module.findExportByName("abYFLlRWLkE"),
      il2cpp_class_is_abstract: () => Il2Cpp.module.findExportByName("KzUfxvpjPGU"),
      il2cpp_class_is_interface: () => Il2Cpp.module.findExportByName("aBzTQMrlrkG"),
      il2cpp_class_array_element_size: () => Il2Cpp.module.findExportByName("ubYLAFwxJgn"),
      il2cpp_class_from_type: () => Il2Cpp.module.findExportByName("DqQibdMbCrZ"),
      il2cpp_class_get_type: () => Il2Cpp.module.findExportByName("ZwSelDIHpRI"),
      il2cpp_class_get_type_token: () => Il2Cpp.module.findExportByName("XPCBDvKLOsG"),
      il2cpp_class_has_attribute: () => Il2Cpp.module.findExportByName("RUocyORFfEJ"),
      il2cpp_class_has_references: () => Il2Cpp.module.findExportByName("tQdxjl_BIlQ"),
      il2cpp_class_is_enum: () => Il2Cpp.module.findExportByName("UhTvDE_tygr"),
      il2cpp_class_get_image: () => Il2Cpp.module.findExportByName("rFgfoqWEMNk"),
      il2cpp_class_get_assemblyname: () => Il2Cpp.module.findExportByName("RoFTezSNJHE"),
      il2cpp_class_get_rank: () => Il2Cpp.module.findExportByName("fnpniEBVeZH"),
      il2cpp_class_get_data_size: () => Il2Cpp.module.findExportByName("ORUDNiUvMzY"),
      il2cpp_class_get_static_field_data: () => Il2Cpp.module.findExportByName("gNkKZMPJlbe"),
      il2cpp_stats_dump_to_file: () => Il2Cpp.module.findExportByName("Lmd_AQfgxji"),
      il2cpp_stats_get_value: () => Il2Cpp.module.findExportByName("FuYwsQOYBjV"),
      il2cpp_domain_get: () => Il2Cpp.module.findExportByName("oYQKjhDCIkJ"),
      il2cpp_domain_assembly_open: () => Il2Cpp.module.findExportByName("OjWNUKNSOZh"),
      il2cpp_domain_get_assemblies: () => Il2Cpp.module.findExportByName("LXctKGJHuFR"),
      il2cpp_raise_exception: () => Il2Cpp.module.findExportByName("UsIJGtwUIld"),
      il2cpp_exception_from_name_msg: () => Il2Cpp.module.findExportByName("bctSVlJwIoZ"),
      il2cpp_get_exception_argument_null: () => Il2Cpp.module.findExportByName("rhrjZOAeHjd"),
      il2cpp_format_exception: () => Il2Cpp.module.findExportByName("cg_rEJVZ_yP"),
      il2cpp_format_stack_trace: () => Il2Cpp.module.findExportByName("owusfFggwjn"),
      il2cpp_unhandled_exception: () => Il2Cpp.module.findExportByName("WQJyxCwcaVq"),
      il2cpp_native_stack_trace: () => Il2Cpp.module.findExportByName("SlNjCRrzLTO"),
      il2cpp_field_get_flags: () => Il2Cpp.module.findExportByName("HqROENP_WXg"),
      il2cpp_field_get_from_reflection: () => Il2Cpp.module.findExportByName("QMbupzjuTfa"),
      il2cpp_field_get_name: () => Il2Cpp.module.findExportByName("GlxrvACnfCP"),
      il2cpp_field_get_parent: () => Il2Cpp.module.findExportByName("ktLQRzHTEXa"),
      il2cpp_field_get_object: () => Il2Cpp.module.findExportByName("hFj_fIzbyUN"),
      il2cpp_field_get_offset: () => Il2Cpp.module.findExportByName("HjnCKtikOOD"),
      il2cpp_field_get_type: () => Il2Cpp.module.findExportByName("I_WPqLadKbj"),
      il2cpp_field_get_value: () => Il2Cpp.module.findExportByName("HCoLVCtsJQy"),
      il2cpp_field_get_value_object: () => Il2Cpp.module.findExportByName("ATdbPfdtYmp"),
      il2cpp_field_has_attribute: () => Il2Cpp.module.findExportByName("QsIHKItLvyW"),
      il2cpp_field_set_value: () => Il2Cpp.module.findExportByName("Ux_KcvSkbBW"),
      il2cpp_field_static_get_value: () => Il2Cpp.module.findExportByName("FxLLEZdqzEx"),
      il2cpp_field_static_set_value: () => Il2Cpp.module.findExportByName("IcfTAtEWPhd"),
      il2cpp_field_set_value_object: () => Il2Cpp.module.findExportByName("amyKzMzxBrq"),
      il2cpp_field_is_literal: () => Il2Cpp.module.findExportByName("ahHKXiQhuZE"),
      il2cpp_gc_collect: () => Il2Cpp.module.findExportByName("gfgnDAwqtkw"),
      il2cpp_gc_collect_a_little: () => Il2Cpp.module.findExportByName("YYMTaHEAjpO"),
      il2cpp_gc_start_incremental_collection: () => Il2Cpp.module.findExportByName("lojkjsjaSTg"),
      il2cpp_gc_disable: () => Il2Cpp.module.findExportByName("nlUmHIVDTwY"),
      il2cpp_gc_enable: () => Il2Cpp.module.findExportByName("JFRbqxCDNCA"),
      il2cpp_gc_is_disabled: () => Il2Cpp.module.findExportByName("isZpBnRNqm_"),
      il2cpp_gc_set_mode: () => Il2Cpp.module.findExportByName("JFCPsXFnSTO"),
      il2cpp_gc_get_max_time_slice_ns: () => Il2Cpp.module.findExportByName("oWzinrXnikA"),
      il2cpp_gc_set_max_time_slice_ns: () => Il2Cpp.module.findExportByName("SWOH_XJBCda"),
      il2cpp_gc_is_incremental: () => Il2Cpp.module.findExportByName("UqASgNISETd"),
      il2cpp_gc_get_used_size: () => Il2Cpp.module.findExportByName("dtPILqIBKT_"),
      il2cpp_gc_get_heap_size: () => Il2Cpp.module.findExportByName("kdsWX_rPzbU"),
      il2cpp_gc_wbarrier_set_field: () => Il2Cpp.module.findExportByName("WIyaRMgoGTT"),
      il2cpp_gc_has_strict_wbarriers: () => Il2Cpp.module.findExportByName("jTeYyfHmFiF"),
      il2cpp_gc_set_external_allocation_tracker: () => Il2Cpp.module.findExportByName("TwTQFxrLgfD"),
      il2cpp_gc_set_external_wbarrier_tracker: () => Il2Cpp.module.findExportByName("BZQZByJLQFe"),
      il2cpp_gc_foreach_heap: () => Il2Cpp.module.findExportByName("xIMQjQMEwxr"),
      il2cpp_stop_gc_world: () => Il2Cpp.module.findExportByName("IKe_WDGLXwB"),
      il2cpp_start_gc_world: () => Il2Cpp.module.findExportByName("aKTQzdjxrgo"),
      il2cpp_gc_alloc_fixed: () => Il2Cpp.module.findExportByName("cEEYZtV_kZt"),
      il2cpp_gc_free_fixed: () => Il2Cpp.module.findExportByName("wdkaEAPTodN"),
      il2cpp_gchandle_new: () => Il2Cpp.module.findExportByName("kEvnlZUYioc"),
      il2cpp_gchandle_new_weakref: () => Il2Cpp.module.findExportByName("vM_JcqtAFON"),
      il2cpp_gchandle_get_target: () => Il2Cpp.module.findExportByName("kyUCPYRyTWE"),
      il2cpp_gchandle_free: () => Il2Cpp.module.findExportByName("bWIOHVNMpOo"),
      il2cpp_gchandle_foreach_get_target: () => Il2Cpp.module.findExportByName("ycuHkEQTibe"),
      il2cpp_object_header_size: () => Il2Cpp.module.findExportByName("SgTzMfaUYdQ"),
      il2cpp_array_object_header_size: () => Il2Cpp.module.findExportByName("UDKmXI_pJtT"),
      il2cpp_offset_of_array_length_in_array_object_header: () => Il2Cpp.module.findExportByName("EkafhZlPdwy"),
      il2cpp_offset_of_array_bounds_in_array_object_header: () => Il2Cpp.module.findExportByName("UZgxIGVtmHJ"),
      il2cpp_allocation_granularity: () => Il2Cpp.module.findExportByName("NaDmBXVaU_H"),
      il2cpp_unity_liveness_allocate_struct: () => Il2Cpp.module.findExportByName("N_VDVhTWMhX"),
      il2cpp_unity_liveness_calculation_from_root: () => Il2Cpp.module.findExportByName("KlbJMvMCElV"),
      il2cpp_unity_liveness_calculation_from_statics: () => Il2Cpp.module.findExportByName("XcKFsDgQztM"),
      il2cpp_unity_liveness_finalize: () => Il2Cpp.module.findExportByName("mDVEaECXlKA"),
      il2cpp_unity_liveness_free_struct: () => Il2Cpp.module.findExportByName("fmrnkDMhycx"),
      il2cpp_method_get_return_type: () => Il2Cpp.module.findExportByName("C_PmznrDejv"),
      il2cpp_method_get_declaring_type: () => Il2Cpp.module.findExportByName("ETRMrIALpfe"),
      il2cpp_method_get_name: () => Il2Cpp.module.findExportByName("nRvfOQRnxGX"),
      il2cpp_method_get_from_reflection: () => Il2Cpp.module.findExportByName("khNvZHwchoz"),
      il2cpp_method_get_object: () => Il2Cpp.module.findExportByName("_XxLuZimMPu"),
      il2cpp_method_is_generic: () => Il2Cpp.module.findExportByName("YYGgLPgveFo"),
      il2cpp_method_is_inflated: () => Il2Cpp.module.findExportByName("yshgdRsUj_d"),
      il2cpp_method_is_instance: () => Il2Cpp.module.findExportByName("xZRdezwyovX"),
      il2cpp_method_get_param_count: () => Il2Cpp.module.findExportByName("pgJMBBZSFVS"),
      il2cpp_method_get_param: () => Il2Cpp.module.findExportByName("yRqOzLOoORT"),
      il2cpp_method_get_class: () => Il2Cpp.module.findExportByName("kCnIWfqcnCe"),
      il2cpp_method_has_attribute: () => Il2Cpp.module.findExportByName("skpgVqjjhrg"),
      il2cpp_method_get_flags: () => Il2Cpp.module.findExportByName("auLEYIRgv_T"),
      il2cpp_method_get_token: () => Il2Cpp.module.findExportByName("AdybFRybyAV"),
      il2cpp_method_get_param_name: () => Il2Cpp.module.findExportByName("ErJoMaynTVu"),
      il2cpp_property_get_flags: () => Il2Cpp.module.findExportByName("VqoYNYRpRXM"),
      il2cpp_property_get_get_method: () => Il2Cpp.module.findExportByName("ZgsKEMyunPY"),
      il2cpp_property_get_set_method: () => Il2Cpp.module.findExportByName("nJMpIOoITrp"),
      il2cpp_property_get_name: () => Il2Cpp.module.findExportByName("dySyMmgFTka"),
      il2cpp_property_get_parent: () => Il2Cpp.module.findExportByName("CngRZjkiKxR"),
      il2cpp_object_get_class: () => Il2Cpp.module.findExportByName("qOqU_AuUZyC"),
      il2cpp_object_get_size: () => Il2Cpp.module.findExportByName("HZeuNiHMoUx"),
      il2cpp_object_get_virtual_method: () => Il2Cpp.module.findExportByName("ObywcxDqczo"),
      il2cpp_object_new: () => Il2Cpp.module.findExportByName("JjtlkvxPOmD"),
      il2cpp_object_unbox: () => Il2Cpp.module.findExportByName("UovD_lbaVuJ"),
      il2cpp_value_box: () => Il2Cpp.module.findExportByName("zpCQtYWI_ft"),
      il2cpp_monitor_enter: () => Il2Cpp.module.findExportByName("lPPShNPoriK"),
      il2cpp_monitor_try_enter: () => Il2Cpp.module.findExportByName("YJXiGBlMdL_"),
      il2cpp_monitor_exit: () => Il2Cpp.module.findExportByName("rqYIcOIzNAY"),
      il2cpp_monitor_pulse: () => Il2Cpp.module.findExportByName("ZiEzxhDmqjf"),
      il2cpp_monitor_pulse_all: () => Il2Cpp.module.findExportByName("ADbyybtpdWq"),
      il2cpp_monitor_wait: () => Il2Cpp.module.findExportByName("xEeEtuCmEZY"),
      il2cpp_monitor_try_wait: () => Il2Cpp.module.findExportByName("BWcyyebViDi"),
      il2cpp_runtime_invoke: () => Il2Cpp.module.findExportByName("CnzwffqboYs"),
      il2cpp_runtime_invoke_convert_args: () => Il2Cpp.module.findExportByName("zMtaqmHuklt"),
      il2cpp_runtime_class_init: () => Il2Cpp.module.findExportByName("zRDyVRyvttp"),
      il2cpp_runtime_object_init: () => Il2Cpp.module.findExportByName("bztMWbSkYJp"),
      il2cpp_runtime_object_init_exception: () => Il2Cpp.module.findExportByName("_lJBmtclBLf"),
      il2cpp_runtime_unhandled_exception_policy_set: () => Il2Cpp.module.findExportByName("KCNDutywIjq"),
      il2cpp_string_length: () => Il2Cpp.module.findExportByName("dejBcAuTVOk"),
      il2cpp_string_chars: () => Il2Cpp.module.findExportByName("SDEXXacIyDE"),
      il2cpp_string_new: () => Il2Cpp.module.findExportByName("XjJGTgAPLSO"),
      il2cpp_string_new_len: () => Il2Cpp.module.findExportByName("FoDjgNQjcqx"),
      il2cpp_string_new_utf16: () => Il2Cpp.module.findExportByName("AphvnSFsQTC"),
      il2cpp_string_new_wrapper: () => Il2Cpp.module.findExportByName("dybqnmLppdH"),
      il2cpp_string_intern: () => Il2Cpp.module.findExportByName("q_FnEuQyNSh"),
      il2cpp_string_is_interned: () => Il2Cpp.module.findExportByName("cqFQzXhkyMp"),
      il2cpp_thread_current: () => Il2Cpp.module.findExportByName("qopsiMxhplr"),
      il2cpp_thread_attach: () => Il2Cpp.module.findExportByName("BqEoKGbomZx"),
      il2cpp_thread_detach: () => Il2Cpp.module.findExportByName("yMVPKWiQhIA"),
      il2cpp_is_vm_thread: () => Il2Cpp.module.findExportByName("lRMbeRYUbin"),
      il2cpp_current_thread_walk_frame_stack: () => Il2Cpp.module.findExportByName("aDJQcvmvnEu"),
      il2cpp_thread_walk_frame_stack: () => Il2Cpp.module.findExportByName("WsjYotXyGZV"),
      il2cpp_current_thread_get_top_frame: () => Il2Cpp.module.findExportByName("VYqBhErzeBn"),
      il2cpp_thread_get_top_frame: () => Il2Cpp.module.findExportByName("jajCbCFaPHF"),
      il2cpp_current_thread_get_frame_at: () => Il2Cpp.module.findExportByName("wNommPAVLAl"),
      il2cpp_thread_get_frame_at: () => Il2Cpp.module.findExportByName("UVhXvhlOsdK"),
      il2cpp_current_thread_get_stack_depth: () => Il2Cpp.module.findExportByName("GUAfkcyVWrC"),
      il2cpp_thread_get_stack_depth: () => Il2Cpp.module.findExportByName("arioLnXCyY_"),
      il2cpp_override_stack_backtrace: () => Il2Cpp.module.findExportByName("pwoVqYxGgBQ"),
      il2cpp_type_get_object: () => Il2Cpp.module.findExportByName("LJLRWYCeAcH"),
      il2cpp_type_get_type: () => Il2Cpp.module.findExportByName("PHmjabhVoCc"),
      il2cpp_type_get_class_or_element_class: () => Il2Cpp.module.findExportByName("NmZe_vIrlT_"),
      il2cpp_type_get_name: () => Il2Cpp.module.findExportByName("evzrBJPHHLc"),
      il2cpp_type_is_byref: () => Il2Cpp.module.findExportByName("TrWlJUTFFdW"),
      il2cpp_type_get_attrs: () => Il2Cpp.module.findExportByName("c_lPWoRbQEM"),
      il2cpp_type_equals: () => Il2Cpp.module.findExportByName("feMTDcfoKUi"),
      il2cpp_type_get_assembly_qualified_name: () => Il2Cpp.module.findExportByName("xuvZpiWKXmQ"),
      il2cpp_type_get_reflection_name: () => Il2Cpp.module.findExportByName("jCyDtXBlDCu"),
      il2cpp_type_is_static: () => Il2Cpp.module.findExportByName("XPOWTnBfbSh"),
      il2cpp_type_is_pointer_type: () => Il2Cpp.module.findExportByName("EKawOjgzBTF"),
      il2cpp_image_get_assembly: () => Il2Cpp.module.findExportByName("mYMKBfykBZA"),
      il2cpp_image_get_name: () => Il2Cpp.module.findExportByName("MjZDbXimaDI"),
      il2cpp_image_get_filename: () => Il2Cpp.module.findExportByName("qHYcftTsElM"),
      il2cpp_image_get_entry_point: () => Il2Cpp.module.findExportByName("CYecQIANDtd"),
      il2cpp_image_get_class_count: () => Il2Cpp.module.findExportByName("TJqzKBWoAlG"),
      il2cpp_image_get_class: () => Il2Cpp.module.findExportByName("VRzbJEqQlbu"),
      il2cpp_capture_memory_snapshot: () => Il2Cpp.module.findExportByName("iG_KLbExNGm"),
      il2cpp_free_captured_memory_snapshot: () => Il2Cpp.module.findExportByName("XcIIRlJwmRt"),
      il2cpp_set_find_plugin_callback: () => Il2Cpp.module.findExportByName("V_xtZhFBZSl"),
      il2cpp_register_log_callback: () => Il2Cpp.module.findExportByName("oAqXpqloPQj"),
      il2cpp_debugger_set_agent_options: () => Il2Cpp.module.findExportByName("sgSGmikWkrc"),
      il2cpp_is_debugger_attached: () => Il2Cpp.module.findExportByName("pDyUAWO_TUx"),
      il2cpp_register_debugger_agent_transport: () => Il2Cpp.module.findExportByName("MEFYZXZOcxL"),
      il2cpp_debug_foreach_method: () => Il2Cpp.module.findExportByName("PcxeqsUNQGH"),
      il2cpp_debug_get_method_info: () => Il2Cpp.module.findExportByName("RSCBjhqYZmE"),
      il2cpp_unity_install_unitytls_interface: () => Il2Cpp.module.findExportByName("FJeP_XJYplj"),
      il2cpp_custom_attrs_from_class: () => Il2Cpp.module.findExportByName("sNvrTuqYYPI"),
      il2cpp_custom_attrs_from_method: () => Il2Cpp.module.findExportByName("mZyuBIYsmvj"),
      il2cpp_custom_attrs_from_field: () => Il2Cpp.module.findExportByName("kRHpIOciUYw"),
      il2cpp_custom_attrs_get_attr: () => Il2Cpp.module.findExportByName("DNdCIgCLroq"),
      il2cpp_custom_attrs_has_attr: () => Il2Cpp.module.findExportByName("gAnoKNblOed"),
      il2cpp_custom_attrs_construct: () => Il2Cpp.module.findExportByName("awjifQBXNwx"),
      il2cpp_custom_attrs_free: () => Il2Cpp.module.findExportByName("mDKOJXHENWi"),
      il2cpp_class_set_userdata: () => Il2Cpp.module.findExportByName("sfyafjGoTyK"),
      il2cpp_class_get_userdata_offset: () => Il2Cpp.module.findExportByName("OUJesCXKFoM"),
      il2cpp_set_default_thread_affinity: () => Il2Cpp.module.findExportByName("ynwNagTiGTo"),
      il2cpp_unity_set_android_network_up_state_func: () => Il2Cpp.module.findExportByName("dIHHgUDEbNt")
    };
    Il2Cpp.perform(() => {
      const AppUtils = Il2Cpp.domain.assembly("AnimalCompany").image.class("AnimalCompany.AppUtils");
      const method = AppUtils.method("CalculatePhotonAppVersion");
      console.log("you're welcome 444 users");
      method.implementation = function() {
        const spoofed = "lSpvw1BHUYzcYUWxn8fl";
        console.log(`it worked, join discord.gg/t444 if you aren't in it already.`);
        return Il2Cpp.string(spoofed);
      };
    });
  }
});
export default require_QuestServers();

✄
{
  "version": 3,
  "sources": ["frida-builtins:/node-globals.js", "QuestServers.ts"],
  "mappings": "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",
  "names": ["Il2Cpp", "Android", "module", "getter", "obj", "UnityVersion", "a", "b", "_", "parameters", "method", "Array", "array", "delegate", "memorySnapshot", "i", "Object", "field", "value"]
}
