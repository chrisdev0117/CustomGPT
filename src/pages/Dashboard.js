import {
  faCircle,
  faComputer,
  faRobot,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const chat = useRef(null);
  const [conversation, setConversations] = useState([]);

  useEffect(() => {
    chat?.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    console.log(conversation.length);
  }, [conversation.length]);
  const handlePrompt = (e) => {
    if (e.key === "Enter") {
      setConversations([...conversation, e.target.value]);
      conversation.push(e.target.value);
      const headers = {
        authorization: "Bearer 3054|RnHVbOPRg3IZR5EWnFotdraPXulztrXzjI4RT8sv",
        accept: "application/json",
        "content-type": "application/json",
      };
      const data = {
        prompt: e.target.value,
        response_source: "default",
        chatbot_model: "gpt-4",
      };
      axios
        .post(
          "https://app.customgpt.ai/api/v1/projects/10761/conversations/612eab5c-f7e8-483b-9aba-7f43ce926994/messages?stream=false&lang=en",
          data,
          {
            headers,
          }
        )
        .then(function (response) {
          console.log(response.data);
          console.log(conversation);
          setConversations([
            ...conversation,
            response.data.data.openai_response,
          ]);
        })
        .catch(function (error) {
          console.error(error);
        });

      e.target.value = "";
    }
  };

  return (
    <div className="max-w-5xl pt-10 mx-auto">
      <div className="overflow-y-auto pb-28" ref={chat}>
        {conversation.map((conv, index) => (
          <div key={index}>
            {index % 2 === 0 ? (
              <div className="flex gap-5 mt-5">
                <div className="w-[5%] pt-2 text-center text-white bg-gray-500 rounded-lg">
                  <FontAwesomeIcon icon={faUser} className="size-8" />
                </div>
                <div className="w-full p-5 text-white bg-gray-500 rounded-lg">
                  {conv}
                </div>
              </div>
            ) : (
              <div className="flex gap-5 mt-5">
                <div className="w-[5%] pt-2 text-center text-white  bg-gray-500 rounded-lg">
                  <FontAwesomeIcon icon={faRobot} className="size-8" />
                </div>
                <div className="w-full p-5 text-white whitespace-pre-wrap bg-gray-500 rounded-lg">
                  {conv}
                </div>
              </div>
            )}
          </div>
        ))}
        {conversation.length % 2 === 1 && (
          <div className="flex gap-5 mt-5">
            <div className="w-[5%] pt-2 text-center text-white  bg-gray-500 rounded-lg">
              <FontAwesomeIcon icon={faRobot} className="size-8" />
            </div>
            <div className="w-full p-5 text-white whitespace-pre-wrap bg-gray-500 rounded-lg">
              <FontAwesomeIcon icon={faCircle} className="animate-bounce" />
            </div>
          </div>
        )}
      </div>
      <input
        className="fixed w-full max-w-5xl pl-4 text-lg text-white bg-gray-500 border-2 border-white rounded-3xl bottom-5 h-14"
        onKeyDown={handlePrompt}
      />
    </div>
  );
}
