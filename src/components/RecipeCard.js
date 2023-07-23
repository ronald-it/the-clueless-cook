export default function RecipeCard() {
  return <article className="rounded-xs shadow-md m-2 p-2">
    <span>Recipe Title</span>
    <div className="flex justify-between">
    <span>300 calories | 10 ingredients</span>
    <span>20 min.</span>
    </div>
  </article>
}