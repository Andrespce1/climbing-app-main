// CustomAssemblyLoadContext.js
const { AssemblyLoadContext } = require('assembly-load-context');
const { Reflect } = require('node:inspector');

class CustomAssemblyLoadContext extends AssemblyLoadContext {
  constructor(options) {
    super(options);
  }

  loadUnmanagedLibrary(absolutePath) {
    return this.loadUnmanagedDll(absolutePath);
  }

  loadUnmanagedDll(unmanagedDllName) {
    return this.loadUnmanagedDllFromPath(unmanagedDllName);
  }

  load(assemblyName) {
    throw new Error('Not implemented');
  }
}

module.exports = CustomAssemblyLoadContext;