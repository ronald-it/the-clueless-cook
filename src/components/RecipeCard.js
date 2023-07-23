import Image from "next/image";

export default function RecipeCard({image}) {
  return <article className="rounded-md shadow-md m-2 p-2 bg-white">
    <Image src={image} alt="Recipe Image" width='150' height='150' className="w-[18rem] h-[10rem]"/>
    <span>Recipe Title</span>
    <div className="flex justify-between">
    <span>300 calories | 10 ingredients</span>
    <span>20 min.</span>
    </div>
  </article>
}