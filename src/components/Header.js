import CustomImage from "./CustomImage/CustomImage";

export default function Header() {
  return <header className="flex justify-around items-center py-4 border-2 border-black">
    <h1>The Clueless Cook</h1>
    <CustomImage src='/images/Hamburger_icon.svg' alt='Hamburger icon' className='w-8' width={100} height={100} />
  </header>
}