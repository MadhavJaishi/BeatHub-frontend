import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setQueue, type Song } from "../redux/songQueueSlice";
import socket from "./socket";

const QueueListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleQueueUpdate = (queue: any) => {
      console.log("Updated queue received:", queue);
      dispatch(setQueue(queue));
    };

    socket.on("queueUpdated", handleQueueUpdate);

    return () => {
      socket.off("queueUpdated", handleQueueUpdate);
    };
  }, [dispatch]);

  return null;
};

export default QueueListener;
