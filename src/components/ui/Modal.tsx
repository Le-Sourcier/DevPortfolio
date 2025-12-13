import { motion } from "framer-motion";

type ModalProps = {
  onShow: boolean;
  onClose: () => void;
  children: React.ReactNode;
};
function Modal({ ...props }: ModalProps) {
  if (!props.onShow) return;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={props.onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {props.children}
      </motion.div>
    </motion.div>
  );
}

export default Modal;
