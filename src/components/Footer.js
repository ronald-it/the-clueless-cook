import CustomImage from './CustomImage/CustomImage';

export default function Footer() {
  return (
    <footer id='footer' className='bg-darkblue py-6 lg:py-14 flex justify-center'>
      <div className='flex flex-col px-8 gap-y-8 sm:flex-row sm:justify-between sm:[&>*]:justify-start sm:w-full sm:max-w-2xl lg:max-w-7xl'>
        <div className='flex flex-col items-center sm:items-start gap-y-2 [&>*:first-child]:text-xl [&>*:first-child]:mb-2 [&>*:first-child]:text-lightblue [&>*:first-child]:font-semibold sm:[&>*:first-child]:text-lg [&>*]:text-sm sm:[&>*]:text-xs lg:[&>*:first-child]:text-2xl lg:[&>*]:text-base [&>*]:text-white [&>*]:font-light'>
          <h3>Information</h3>
          <span>Nullam a enim</span>
          <span>Quisque cursus</span>
          <span>Cras egestas</span>
          <span>Nunc vitae</span>
        </div>

        <div className='flex flex-col items-center sm:items-start gap-y-2 [&>*:first-child]:text-xl [&>*:first-child]:mb-2 [&>*:first-child]:text-lightblue [&>*:first-child]:font-semibold sm:[&>*:first-child]:text-lg [&>*]:text-sm sm:[&>*]:text-xs lg:[&>*:first-child]:text-2xl lg:[&>*]:text-base [&>*]:text-white [&>*]:font-light'>
          <h3>About</h3>
          <span>Quisque cursus</span>
          <span>Cras egestas</span>
          <span>Nunc vitae</span>
        </div>

        <div className='flex flex-col items-center sm:items-start gap-y-2 [&>*:first-child]:text-xl [&>*:first-child]:mb-2 [&>*:first-child]:text-lightblue [&>*:first-child]:font-semibold sm:[&>*:first-child]:text-lg [&>*]:text-sm sm:[&>*]:text-xs lg:[&>*:first-child]:text-2xl lg:[&>*]:text-base [&>*]:text-white [&>*]:font-light'>
          <h3>Contact</h3>
          <span>Nunc vitae</span>
          <span>Cras egestas</span>
          <span>Nullam a enim</span>
        </div>

        <div className='flex flex-col items-center sm:items-start gap-y-2 [&>*:first-child]:text-xl [&>*:first-child]:mb-2 sm:[&>*:first-child]:text-lg lg:[&>*:first-child]:text-2xl'>
          <h3 className='text-lightblue font-semibold'>Social</h3>
          <div className='flex gap-x-4 [&>*]:bg-lightblue [&>*]:w-8 [&>*]:h-8 [&>*]:p-2 [&>*]:rounded-full'>
            <span>
              <CustomImage src='images/facebook.svg' alt='Facebook icon' width={100} height={100} />
            </span>
            <span>
              <CustomImage
                src='images/instagram.svg'
                alt='Instagram icon'
                width={100}
                height={100}
              />
            </span>
            <span>
              <CustomImage src='images/linkedin.svg' alt='LinkedIn icon' width={100} height={100} />
            </span>
            <span>
              <CustomImage src='images/twitter.svg' alt='Twitter icon' width={100} height={100} />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
