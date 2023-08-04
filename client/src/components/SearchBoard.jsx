import { useState, useEffect } from "react"
import axios from 'axios'

function SearchBoard() {
    const [data, setData] = useState([])
    const [message, setMessage] = useState("")
    const [isError, setIsError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [isCpoy, setIsCopy] = useState(false)
    const [showPhoto, setShowPhoto] = useState(false)
    const [photo, setPhoto] = useState("")

    const getData = async (message) => {
        try {
            setIsError(false)
            setIsLoading(true)
            const result = await axios.get(`http://localhost:4001/trips?keywords=${message}`)
            setData(result.data.data)
            setIsLoading(false)
        } catch (error) {
            setIsError(true)
        }
    }
    useEffect(() => {
        getData(message)
    }, [message])

    const handleCategory = (tag) => {
        if (message === "") {
            setMessage(tag)
        } else {
            setMessage(message + " " + tag)
        }
    }
    const handleCopy = (text) => {
        navigator.clipboard.writeText(text)
        setIsCopy(true)
        setTimeout(() => {
            setIsCopy(false)
        }, 1000)
    }

    const showImage = (photo) => {
        setShowPhoto(true)
        setPhoto(photo)
    }

    return (
        <>
            <div className="flex flex-col items-center py-12 px-32">
                <h1 className="text-blue-500 text-5xl font-semibold">เที่ยวไหนดี</h1>
                <form className="flex flex-col w-full mt-4 px-10">
                    <label htmlFor="message-text" className="text-lg w-fit">ค้นหาที่เที่ยว</label>
                    <input
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
                        <div key={item.eid} className="flex mb-12 relative">
                            <div className="BIG-IMAGE w-1/3 max-h-[450px] overflow-hidden flex items-center rounded-3xl hover:scale-105">
                                <img src={item.photos[0]} className="rounded-3xl cursor-pointer" onClick={() => showImage(item.photos[0])} />
                            </div>
                            <div className="ml-8">
                                <a href={item.url} target="_blank">
                                    <h1 className="TITLE text-2xl font-semibold hover:underline">{item.title}</h1>
                                </a>
                                <p className="DESCRIPT text-lg text-slate-500 mt-2">{item.description.slice(0, 100)} ...</p>
                                <h1 className="text-teal-500 underline"><a href={item.url} target="_blank" className="w-fit hover:font-semibold">อ่านต่อ</a></h1>
                                <h1 className="CATEGORY text-lg text-slate-600 mt-2 flex">หมวด
                                    {item.tags.map((tag, index) => {
                                        if (index !== length - 1) {
                                            return (
                                                <h1 className="mx-2 underline cursor-pointer hover:font-semibold hover:no-underline" onClick={() => handleCategory(tag)}>{tag}</h1>
                                            )
                                        } else {
                                            return (
                                                <>
                                                    <h1 className="mx-2">และ</h1>
                                                    <h1 className="mx-2 underline cursor-pointer hover:font-semibold hover:no-underline" onClick={() => handleCategory(tag)}>{tag}</h1>
                                                </>
                                            )
                                        }
                                    })}</h1>
                                <div className="SMALL-IMAGE flex">
                                    {item.photos.map((image, index) => {
                                        if (index !== 0) {
                                            return (
                                                <div className="w-[120px] h-[120px] mt-4 mr-8 hover:scale-110">
                                                    <img src={image} className="h-full rounded-2xl cursor-pointer" onClick={() => showImage(image)} />
                                                </div>
                                            )
                                        }
                                    })}
                                </div>
                                <div
                                    className="COPY-LINK text-teal-500 text-2xl rounded-full border-2 border-teal-500 p-1 absolute right-0 bottom-0 hover:bg-teal-500 hover:text-white hover:cursor-pointer shadow transform active:scale-75 transition-transform"
                                    onClick={() => handleCopy(item.url)}>
                                    <i className="fa-solid fa-link"></i>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            {/* <h1 className="rounded text-xl px-2 fixed bottom-6 right-10">copy to clipboard</h1> */}
            {showPhoto ? <>
                <div className="SHOW-PHOTO flex justify-center items-center w-full h-[100vh] fixed top-0 left-0 bg-black bg-opacity-60">
                    <div className="max-w-[50vw] max-h-[80vh] relative">
                        <img src={photo} className="max-w-full max-h-full" />
                        <i className="fa-solid fa-xmark absolute text-slate-400 text-4xl -top-8 -right-8 hover:text-white hover:cursor-pointer hover:outline"
                            onClick={() => setShowPhoto(false)}>
                        </i>
                    </div>
                </div>
            </> : null}

            {isError ? <h1 className="py-12 text-4xl">Request failed</h1> : null}
            {isLoading ? <h1 className="py-12 text-4xl">Loading ....</h1> : null}
        </>
    )
}
export default SearchBoard