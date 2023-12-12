import multer from "multer";
import path from 'path'

const storage= multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, 'frontend/public')
    },
    filename:function(req,file,cb){
     console.log(file.originalname,"kddddddddddkdjdhdj");
        cb(null, Date.now()+ path.extname(file.originalname))
    },
})
export const upload= multer({storage})