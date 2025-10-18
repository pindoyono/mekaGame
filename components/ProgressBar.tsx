'use client'

import { motion } from 'framer-motion'

interface ProgressBarProps {
    progress: number
    label?: string
    color?: string
    showPercentage?: boolean
}

export default function ProgressBar({
    progress,
    label,
    color = 'bg-blue-500',
    showPercentage = true
}: ProgressBarProps) {
    return (
        <div className="w-full">
            {label && (
                <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{label}</span>
                    {showPercentage && (
                        <span className="text-sm font-medium text-gray-700">{progress}%</span>
                    )}
                </div>
            )}
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className={`h-full ${color} rounded-full`}
                />
            </div>
        </div>
    )
}
