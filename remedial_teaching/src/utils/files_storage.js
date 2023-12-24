import { files_storage_api_post } from "services/api";

export const store_files = (data, do_not_compress_image) => {
    return files_storage_api_post(data, do_not_compress_image).then(res => {
        return res;
    })
    .catch(err => {
        return err;
    });
}
