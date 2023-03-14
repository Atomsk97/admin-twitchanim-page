import { AdvancedImage, AdvancedVideo } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { limitFit } from "@cloudinary/url-gen/actions/resize";

export default function MediaPlayer({ type, public_id }) {
  const cld = new Cloudinary({
    cloud: {
      cloudName: "atomskmediacloud",
    },
  });

  let myFile;
  let isImg = true;

  if (type === "image") {
    myFile = cld.image(public_id);
  } else if (type === "video" || type === "audio") {
    myFile = cld.video(public_id);
    isImg = false;
  }
  
  myFile.resize(limitFit().width(360).height(720))

  return (
    <div>
      {isImg ? (
        <AdvancedImage cldImg={myFile} />
      ) : (
        <AdvancedVideo cldVid={myFile} controls />
      )}
    </div>
  );
}
