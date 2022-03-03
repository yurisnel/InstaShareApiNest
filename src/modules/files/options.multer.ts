import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { diskStorage } from "multer";

export const optionsFiles: MulterOptions = {
    storage: diskStorage({
      destination: (req, file, cb) => {
        const user: any = req.user;
        const dest = './public/uploads/files/' + user.id;
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const fs = require('fs');
        !fs.existsSync(dest) && fs.mkdirSync(dest, { recursive: true });
        cb(null, dest);
      },
      filename: (req, file, cb) => {
        const timeName = new Date()
          .toISOString()
          .slice(0, 19)
          .replace(/[^0-9]/g, '');
        const fileName = timeName + '-' + file.originalname;
        return cb(null, fileName);
      },
    }),
  };
  
  export const optionsAvatar: MulterOptions = {
    storage: diskStorage({
      destination: (req, file, cb) => {
      
        const dest = './public/uploads/avatars/';
        const fs = require('fs');
        !fs.existsSync(dest) && fs.mkdirSync(dest, { recursive: true });
        cb(null, dest);
      },
      filename: (req, file, cb) => {
        const user: any = req.user;
        const fileName = user.id + '-' + file.originalname;
        return cb(null, fileName);
      },
    }),
  };