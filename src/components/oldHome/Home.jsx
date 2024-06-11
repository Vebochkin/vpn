import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import lottie from "lottie-web";
import Button from "../../components/Button/Button";
import style from "./Home.module.scss";
const Home = () => {
  const [platform, setPlatform] = useState("");
  const [isError, setIsError] = useState(false);
  const [user, setUser] = useState({});

useEffect(() => {
    const getPlatform = () => {
      const userAgent = window.navigator.userAgent;
      if (userAgent.match(/Windows/i)) return "Windows";
      if (userAgent.match(/iOS|iPhone|iPad|iPod/i)) return "iOS";
      if (userAgent.match(/Mac/i)) return "Mac";
      if (userAgent.match(/Android/i)) return "Android";
      if (userAgent.match(/Linux/i)) return "Linux";
      return "Unknown";
    };

    const getUser = async () => {
      const { data } = await axios.post(
        "https://api.dipy.digital/api/get/user",
        {
          username: new URLSearchParams(window.location.search).get("username"),
        },
        {
          headers: {
            Authorization: "7f49280f247287a3574ce51a8bdaaa1c",
          },
        }
      );

      if (data.status !== "active") {
        setIsError(true);
      }
      setUser(data);
    };

    setPlatform(getPlatform());
    getUser();

    if (!document.getElementById("duckIconError")) {
      import("../../img/error_sub.json")
        .then((module) => {
          const animationData = module.default;
          const container = document.createElement("div");
          container.id = "duckIconError";
          document.body.appendChild(container);
          lottie.loadAnimation({
            container,
            renderer: "svg",
            loop: true,
            autoplay: true,
            animationData,
          });
        })
        .catch((error) => {
          console.error("Error loading animation:", error);
        });
    }
  }, []);

  const openLink = (url) => {
    window.location.href = url;
  };

  const sendStat = () => {
    axios.post("https://api.feen.cloud/web/sendStat", {
      user_id: new URLSearchParams(window.location.search).get("user_id"),
      type: "click",
    });
  };

  return (
    <>
      <NavLink id="test" to="/vpn" style={{ display: "none" }} />
      {isError ? (
        <div className={style.contentErrorContainer}>
          <div className={style.topIllustrationContainer}>
            <div id="duckIconError" />
          </div>
          <div>
            <div className={style.title}>Ошибка</div>
            <div className={style.subTitle}>Кажется у Вас закончилась подписка</div>
          </div>
          <div className={style.buttonContainerFixed}>
            <div className={style.buttonContainer}>
              <Button
                appearance="accent"
                stretched
                onClick={() =>
                  openLink(
                    `https://t.me/${new URLSearchParams(window.location.search).get(
                      "username_bot"
                    )}?start=buy_sub`
                  )
                }
              >
                Продлить подписку
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className={style.contentContainer}>
          <div className={style.videoAndroidAndIOSContainer}>
            <iframe
              className={style.videoAndroidAndIOS}
              src={"https://www.youtube.com/embed/xEBDL6GJY20"}
              title="Настройка HitVPN на iPhone #vpn #hitvpn"
              frameborder="0"
              allow="accelerometer; fullscreen; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            />
          </div>
          <div className={style.title}>
            Добро пожаловать в {new URLSearchParams(window.location.search).get("tg_bot")}
          </div>
          <div className={style.subTitle}>На видео выше показан процесс настройки VPN</div>
          <div className={style.buttonContainerFixed}>
            <div className={style.buttonContainer}>
              <NavLink to="/vpn">
                <Button appearance="positive" stretched onClick={() => sendStat()}>
                  Пропустить
                </Button>
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;