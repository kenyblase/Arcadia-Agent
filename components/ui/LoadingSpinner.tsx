import { motion } from "framer-motion";

interface LoadingSpinnerProps {
  size?: string,
  spinnerSize?: string,
  colour?: string
}

const LoadingSpinner = ({size, spinnerSize, colour}: LoadingSpinnerProps) => {
    return (
        <div className={`${size ? size : 'min-h-screen'} flex items-center justify-center relative overflow-hidden`}>
            <motion.div
                className={`${spinnerSize || "w-16 h-16"} border-4 rounded-full`}
                style={{
                    borderColor: "#e5e7eb",   // light gray
                    borderTopColor: colour || "#facc15", // only top spins
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
        </div>
    );
};

export default LoadingSpinner;