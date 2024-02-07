import {
  faBook,
  faHistory,
  faHome,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Sidebar() {
  return (
    <div className="fixed top-0 left-0 w-1/3 h-full p-4 text-white bg-gray-600 max-w-60">
      <h1 className="mb-5 text-3xl font-bold text-center">Custom GPT</h1>
      <hr className="h-1 mb-5 bg-white" />
      <div className="sidebar-link">
        <FontAwesomeIcon icon={faHome} />
        &nbsp; Home
      </div>
      <div className="sidebar-link">
        <FontAwesomeIcon icon={faList} />
        &nbsp; Discover
      </div>
      <div className="sidebar-link">
        <FontAwesomeIcon icon={faHistory} />
        &nbsp; History
      </div>
    </div>
  );
}
