import Link from "next/link";


export default function Home() {
  return (
    <>
      <h2 className="font-medium">تواصل معانا</h2>
      <Link href={"/courses"} >Courses</Link></>
  );
}
