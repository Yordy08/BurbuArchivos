import { d as defineEventHandler, r as readBody, p as prisma } from '../../../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '@prisma/client';

const download_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const image = await prisma.image.update({
    where: { id: body.id },
    data: {
      downloads: {
        increment: 1
      }
    }
  });
  return {
    downloads: image.downloads
  };
});

export { download_post as default };
//# sourceMappingURL=download.post.mjs.map
