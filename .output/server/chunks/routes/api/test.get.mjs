import { d as defineEventHandler } from '../../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '@prisma/client';

const test_get = defineEventHandler(() => ({ ok: true, message: "Test endpoint works" }));

export { test_get as default };
//# sourceMappingURL=test.get.mjs.map
