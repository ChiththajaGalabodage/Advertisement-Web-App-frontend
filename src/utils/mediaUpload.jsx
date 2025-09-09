import { createClient } from "@supabase/supabase-js";

const url = "https://juzeiumingkevaadvkgn.supabase.co";
const key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1emVpdW1pbmdrZXZhYWR2a2duIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0MDA4OTMsImV4cCI6MjA3Mjk3Njg5M30.TlucM4VBRKaorhMr28xQt4WzrboqEt1kQDhno-1qZa4";

const supabase = createClient(url, key);

export default function mediaUpload(file) {
  const mediaUploadPromise = new Promise((resolve, reject) => {
    if (file == null) {
      reject("No file selected");
      return;
    }

    const timestamp = new Date().getTime();
    const newName = timestamp + file.name;

    supabase.storage
      .from("images")
      .upload(newName, file, {
        upsert: false,
        cacheControl: "3600",
      })
      .then(() => {
        const publicUrl = supabase.storage.from("images").getPublicUrl(newName)
          .data.publicUrl;
        resolve(publicUrl);
      })
      .catch(() => {
        reject("Error occured in supabase connection");
      });
  });

  return mediaUploadPromise;
}
