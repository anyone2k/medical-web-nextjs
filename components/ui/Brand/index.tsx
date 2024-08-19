import Image from "next/image"

const Brand = ({ ...props }) => (
    <Image
        src="/favicon.svg"
        alt="Split logo"
        {...props}
        width={50}
        height={70}
        priority
    />
)
export default Brand