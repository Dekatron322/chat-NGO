"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined"

const SignUp: React.FC = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showSuccessNotification, setShowSuccessNotification] = useState(false)
  const [showErrorNotification, setShowErrorNotification] = useState(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const router = useRouter()

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError(null)

    setShowSuccessNotification(true)
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setLoading(false)
    router.push("/projects")
  }

  useEffect(() => {
    if (showSuccessNotification || showErrorNotification) {
      const timer = setTimeout(() => {
        setShowSuccessNotification(false)
        setShowErrorNotification(false)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [showSuccessNotification, showErrorNotification])

  return (
    <section className="relative flex h-screen flex-grow justify-center bg-[#252525]">
      <div className="absolute inset-0 z-0">
        <Image
          src="/AuthImages/bg.jpeg"
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="z-0"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* Foreground Content */}
      <div className="z-10 flex w-full flex-col items-center justify-center">
        <div className=" flex items-center justify-center">
          <img src="/Logo.png" alt="profile" className="max-sm:w-[214px]" />
        </div>
        <h1 className="my-6 text-3xl text-white">Hi, welcome back</h1>
        <div className="flex h-auto rounded-[10px] border bg-[#FFFFFF] max-sm:w-[92%] md:w-[450px] xl:max-w-[450px]">
          <div className="w-full justify-center p-6 max-sm:px-7">
            <form onSubmit={handleSubmit}>
              <label className="text-sm text-[#222222]">Email Address</label>
              <div className="search-bg py-auto mb-3 flex h-[52px] items-center justify-between rounded-md px-3   ">
                <div className="flex w-full items-center">
                  <img src="/AuthImages/Group.png" alt="profile" />
                  <input
                    type="text"
                    id="username"
                    placeholder="Shereefadamu001@gmail.com"
                    className="h-[52px] w-full bg-transparent text-sm outline-none focus:outline-none"
                    style={{
                      padding: "0 12px",
                      lineHeight: "53px",
                      height: "53px",
                    }}
                    value={username}
                    onChange={handleUsernameChange}
                  />
                </div>
              </div>
              <label className="text-sm text-[#222222]">Password</label>
              <div className="search-bg py-auto mb-3 flex h-[52px] items-center justify-between rounded-md px-3  ">
                <div className="flex w-full items-center gap-3">
                  <img src="/AuthImages/Vector.png" alt="profile" />
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    id="password"
                    placeholder="Enter Password"
                    className="h-[53px] w-full bg-transparent text-sm outline-none focus:outline-none"
                    style={{ width: "100%" }}
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  <button type="button" className="focus:outline-none" onClick={togglePasswordVisibility}>
                    {isPasswordVisible ? (
                      <RemoveRedEyeOutlinedIcon />
                    ) : (
                      <Image
                        className="icon-style"
                        src="/AuthImages/eye-close-line.svg"
                        width={24}
                        height={24}
                        alt="toggle password visibility"
                      />
                    )}
                  </button>
                </div>
              </div>
              <div className="mt-5 flex w-full gap-6">
                <button
                  type="submit"
                  className="button-primary h-[50px] w-full rounded-md max-sm:h-[45px]"
                  disabled={loading}
                >
                  {loading ? "hang on..." : "Log in"}
                </button>
              </div>
              <Link href="/forgot-password" className="mt-5 flex content-center items-center">
                <p className="text-sm text-[#17CE89]">Forgot Password</p>
              </Link>
              <div className="mt-8 flex w-full items-center gap-2 text-sm">
                <p>Don’t have an account?</p>
                <Link href="#" className="text-[#17CE89] hover:underline">
                  Create Account
                </Link>
              </div>
            </form>
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    </section>
  )
}

export default SignUp
