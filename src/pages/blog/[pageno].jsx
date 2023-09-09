import { useRouter } from "next/router"

const Pageno = () => {
    const router = useRouter();
    const pageNumber = router.query.pageno;
  return (
    <div>This is the {pageNumber} of Blog</div>
  )
}

export default Pageno