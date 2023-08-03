import { useState } from "react"
import { Link } from "react-router-dom"

function SearchBoard() {
    const test = [
        {
            title: "คู่มือเที่ยวเกาะช้าง กิน เที่ยว พักที่ไหนดี? อ่านจบครบที่เดียว!",
            eid: "1",
            url: "https://www.wongnai.com/trips/travel-koh-chang",
            description:
                "วันว่างนี้ไปเที่ยวเกาะช้างกัน พร้อมทำกิจกรรมต่าง ๆ เช่น เที่ยวน้ำตก ล่องเรือชมป่าชายเลน ขี่ช้างท่องป่า ผจญภัยเหนือยอดไม้ และดำน้ำตื้น รับรอทริปนี้สนุกแน่!\n\n“เกาะช้าง” จังหวัดตราด ที่เที่ยวทะเลใกล้กรุงเทพฯ สามารถเที่ยวกันได้ทุกฤดู เคลียร์งานและวันว่างได้แล้วก็แค่จัดกระเป๋าไปกันได้เลยกับแพลน เที่ยวเกาะช้าง ต้องไปกิน เที่ยว พักที่ไหน? อ่านจบครบที่เดียว! ซึ่งหลายคนสงสัยว่าไปเกาะช้างเที่ยวไหนดี? Wongnai Travel บอกเลยเกาะช้างไม่ได้มีแค่ไปเล่นน้ำทะเล หรือนอนพักริมหาดทรายเท่านั้น เพราะมีกิจกรรมสนุก ๆ รออยู่เพียบ ชนิดที่ไม่ว่างให้นอนอยู่ห้องเฉย ๆ อย่าง เที่ยวชมน้ำตก พายเรือคายัค ล่องเรือมาด ชมธรรมชาติป่าชายเลน ขี่ช้างท่องป่า ตื่นเต้นกับการผจญภัยเหนือยอดไม้ ดำน้ำตื้นชมปะการังและฝูงปลาแบบใกล้ชิด นอกจากนี้ยังมีที่พักเกาะช้าง และร้านอาหารเกาะช้าง มาให้เลือกกันอีกด้วย รับรองทริปนี้กินอิ่ม นอนหลับ เที่ยวสนุกแน่นอน",
            photos: [
                "https://img.wongnai.com/p/1600x0/2019/07/02/3c758646aa6c426ba3c6a81f57b20bd6.jpg",
                "https://img.wongnai.com/p/1600x0/2019/07/02/6a2733ab91164ac8943b77deb14fdbde.jpg",
                "https://img.wongnai.com/p/1600x0/2019/07/02/941dbb607f0742bbadd63bbbd993e187.jpg",
                "https://img.wongnai.com/p/1600x0/2019/07/02/bd1d256256c14c208d0843a345f75741.jpg",
            ],
            tags: ["เกาะ", "ทะเล", "จุดชมวิว", "ธรรมชาติ", "ตราด"],
        },]
    const [data, setData] = useState(test)
    const [message, setMessage] = useState("")

    return (
        <>
            <div className="flex flex-col items-center py-12 px-32">
                <h1 className="text-blue-500 text-5xl font-semibold">เที่ยวไหนดี</h1>
                <form className="flex flex-col w-full mt-4 px-10">
                    <label htmlFor="message-text" className="text-lg w-fit">ค้นหาที่เที่ยว</label>
                    <input
                        minLength={2}
                        debounceTimeout={500}
                        id="message-text"
                        name="message-text"
                        type="text"
                        placeholder="หาที่เที่ยวแล้วไปกัน ..."
                        className="text-lg text-center p-2 mb-12 border-b focus:outline-none focus:border-black"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </form>
                {data.map((item) => {
                    let length = item.tags.length
                    return (
                        <div key={item.eid} className="flex">
                            <img src={item.photos[0]} className="BIG-IMAGE w-1/3 rounded-3xl" />
                            <div className="ml-8 relative">
                                <h1 className="TITLE text-3xl font-semibold">{item.title}</h1>
                                <p className="DESCRIPT text-lg text-slate-500 mt-2">{item.description.slice(0, 100)} ...</p>
                                <Link to={`/view/${item.eid}`}>
                                    <h1 className="text-teal-500 underline">อ่านต่อ</h1>
                                </Link>
                                <h1 className="CATEGORY text-lg text-slate-600 mt-2 flex">หมวด
                                    {item.tags.map((tag, index) => {
                                        if (index !== length - 1) {
                                            return (
                                                <h1 className="mx-2 underline">{tag}</h1>
                                            )
                                        } else {
                                            return (
                                                <>
                                                    <h1 className="mx-2">และ</h1>
                                                    <h1 className="mx-2 underline">{tag}</h1>
                                                </>
                                            )
                                        }
                                    })}</h1>
                                <div className="SMALL-IMAGE flex">
                                    {item.photos.map((image, index) => {
                                        if (index !== 0) {
                                            return (
                                                <div className="w-[120px] h-[120px] mt-4 mr-8">
                                                    <img src={image} className="h-full w-full rounded-2xl" />
                                                </div>
                                            )
                                        }
                                    })}
                                </div>
                                <div
                                    className="text-teal-500 text-2xl rounded-full border-2 border-teal-500 p-1 absolute right-0 bottom-0 hover:bg-teal-500 hover:text-white hover:cursor-pointer">
                                    <i class="fa-solid fa-link"></i>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
export default SearchBoard