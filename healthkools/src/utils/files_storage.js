import {files_storage_api_post} from "services/api";

export const store_files = data => {
    return files_storage_api_post(data).then(res => {
        return res;
    })
    .catch(err => {
        return err;
    });
}
