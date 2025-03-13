import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder as NodeTextDecoder } from 'util';

// Patch global TextEncoder if not available
if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder;
}

// Patch global TextDecoder if not available
if (typeof global.TextDecoder === 'undefined') {
  class PolyfillTextDecoder extends (NodeTextDecoder as any) {
    constructor(label?: string, options?: TextDecoderOptions) {
      super(label, options);
    }
  }

  global.TextDecoder = PolyfillTextDecoder as unknown as typeof TextDecoder;
}
