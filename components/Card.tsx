'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface CardProps {
    children: ReactNode
    className?: string
    onClick?: () => void
    gradient?: string
    hover?: boolean
}

export default function Card({
    children,
    className = '',
    onClick,
    gradient = 'from-white to-gray-100',
    hover = true
}: CardProps) {
    return (
        <motion.div
            whileHover={hover ? { scale: 1.05, y: -5 } : {}}
            whileTap={hover ? { scale: 0.95 } : {}}
            className={`bg-gradient-to-br ${gradient} rounded-xl p-6 shadow-lg ${onClick ? 'cursor-pointer' : ''
                } ${className}`}
            onClick={onClick}
        >
            {children}
        </motion.div>
    )
}
