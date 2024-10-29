import CustomImage from "./CustomImage/CustomImage";

export default function Footer() {
  return <footer className="flex flex-col items-center bg-darkblue py-16 [&>*]:flex [&>*]:flex-col [&>*]:items-center">
    <div>
    <h3 className="text-lightblue font-semibold mb-2">Information</h3>
    <div className="flex flex-col items-center [&>*]:text-white [&>*]:font-light [&>*]:py-1">
    <span>Nullam a enim</span>
    <span>Quisque cursus</span>
    <span>Cras egestas</span>
    <span>Nunc vitae</span>
    </div>
    </div>
    <div>
    <h3 className="text-lightblue font-semibold mt-6 mb-2">About</h3>
    <div className="flex flex-col items-center [&>*]:text-white [&>*]:font-light [&>*]:py-1">
    <span>Quisque cursus</span>
    <span>Cras egestas</span>
    <span>Nunc vitae</span>
    </div>
    </div>
    <div>
    <h3 className="text-lightblue font-semibold mt-6 mb-2">Contact</h3>
    <div className="flex flex-col items-center [&>*]:text-white [&>*]:font-light [&>*]:py-1">
    <span>Nunc vitae</span>
    <span>Cras egestas</span>
    <span>Nullam a enim</span>
    </div>
    </div>
    <div>
    <h3 className="text-lightblue font-semibold mt-6 mb-4">Social</h3>
    <div className="flex [&>*]:bg-lightblue [&>*]:w-8 [&>*]:h-8 [&>*]:p-2 [&>*]:rounded-full [&>*]:mx-2">
        <span>
        <CustomImage src='images/facebook.svg' width={100} height={100} />
        </span>
        <span>
        <CustomImage src='images/instagram.svg' width={100} height={100} />
        </span>
        <span>
        <CustomImage src='images/linkedin.svg' width={100} height={100} />
        </span>
        <span>
        <CustomImage src='images/twitter.svg' width={100} height={100} />
        </span>
    </div>
    </div>
  </footer>
}