import cl from "../components/styles/Price.module.css";
import greenglow from "../img/greenglow.png";
import redglow from "../img/redglow.png";
import ButtonRound from "./UI/buttons/ButtonRound.jsx";
import MyCheckBox from "./UI/inputs/MyCheckBox";
import { useNavigate } from "react-router-dom";
import CopyToClipboard from "react-copy-to-clipboard";
import { useTelegram } from "../hooks/useTelegram";

export default function Price({
  handleOnCopy,
  data,
  index,
  checked,
  markCheck,
  storeId,
}) {
  const router = useNavigate();
  const { tg } = useTelegram();

  const activate = () => {
    const telegramData = {
      method: "activate",
      id: [data.id],
    };
    tg.sendData(JSON.stringify(telegramData));
  };

  const deactivate = () => {
    const telegramData = {
      method: "deactivate",
      id: [data.id],
    };
    tg.sendData(JSON.stringify(telegramData));
  };

  const deleteprice = () => {
    const telegramData = {
      method: "delete",
      id: [data.id],
    };
    tg.sendData(JSON.stringify(telegramData));
  };

  const handleOnCopyTest = () => {
    tg.showAlert("Скопировано.");
  };

  return (
    <div className={cl.Price + " " + (checked ? cl.checked : "")}>
      <div className={cl.horizontalthree}>
        <div className={cl.index}>
          <div>
            <MyCheckBox
              checked={checked ? checked : false}
              onChange={(e) => {
                markCheck(data.id, e.target.checked);
              }}
            ></MyCheckBox>
          </div>
          <div className={cl.hint}>{index + 1}</div>
        </div>
        <div>
          {data.activated === "yes" ? (
            <img src={greenglow} />
          ) : (
            <img src={redglow} />
          )}
        </div>
        <div className={cl.hint}>{data.id}</div>
      </div>
      <div className={cl.sku}>
        <a href={data.url}>{data.suk}</a>
        <CopyToClipboard
          onCopy={() => {
            handleOnCopyTest();
          }}
          text={"https://kaspi.kz/shop/p/-" + data.suk + "/?m=" + storeId}
        >
          <div className={cl.copy}></div>
        </CopyToClipboard>
      </div>
      <div className={cl.model}>{data.brand + " " + data.model}</div>
      <div className={cl.category}>
        <p className={cl.hint}>
          {data.category ? data.category : "Категория"}{" "}
          {new Date(data.date).toLocaleString("ru")}
        </p>
      </div>
      <div className={cl.horizontalthree}>
        <div className={cl.cost}>
          <div className={cl.hint}>Мин.:</div>
          <div>{data.minprice}</div>
        </div>
        <div className={cl.cost}>
          <div className={cl.hint}>Сейч.:</div>
          <div>{data.actualprice}</div>
        </div>
        <div className={cl.cost}>
          <div className={cl.hint}>Макс.:</div>
          <div>{data.maxprice}</div>
        </div>
      </div>
      <div className={cl.horizontaltwo}>
        <div className={cl.pp}>
          <p className={cl.hint}>PP:</p>
          <p
            className={
              data.availability?.$?.available === "yes" ? cl.ppgreen : cl.ppred
            }
          >
            1
          </p>
          <p
            className={
              data.availability2?.$?.available === "yes" ? cl.ppgreen : cl.ppred
            }
          >
            2
          </p>
          <p
            className={
              data.availability3?.$?.available === "yes" ? cl.ppgreen : cl.ppred
            }
          >
            3
          </p>
          <p
            className={
              data.availability4?.$?.available === "yes" ? cl.ppgreen : cl.ppred
            }
          >
            4
          </p>
          <p
            className={
              data.availability5?.$?.available === "yes" ? cl.ppgreen : cl.ppred
            }
          >
            5
          </p>
        </div>
        <div className={cl.buttons}>
          <ButtonRound onClick={data.activated ? deactivate : activate}>
            {data.activated === "yes" ? "Деакт." : "Актив."}
          </ButtonRound>
          <ButtonRound onClick={deleteprice}>Удал.</ButtonRound>
          <ButtonRound
            onClick={() => {
              router("/edit/" + data.id);
            }}
          >
            Ред.
          </ButtonRound>
        </div>
      </div>
    </div>
  );
}
