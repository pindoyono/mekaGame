"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Cpu,
  Fan,
  Lightbulb,
  Gauge,
  Zap,
  CheckCircle,
} from "lucide-react";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Modal from "@/components/Modal";
import { useAuth } from "@/contexts/AuthContext";

export default function ActuatorModule() {
  const { updateProgress, getLevelProgress } = useAuth();
  const [selectedActuator, setSelectedActuator] = useState<any>(null);
  const [motorSpeed, setMotorSpeed] = useState(50);
  const [servoAngle, setServoAngle] = useState(90);
  const [ledBrightness, setLedBrightness] = useState(50);
  const [showCompleteModal, setShowCompleteModal] = useState(false);

  // Check if already completed
  const levelProgress = getLevelProgress(7); // Level 7 = Actuator
  const isCompleted = levelProgress?.completed || false;

  const handleComplete = () => {
    // Mark as completed with 100% score (no quiz, just interactive)
    updateProgress(7, 100, true); // Level 7 = Actuator Module
    setShowCompleteModal(true);

    setTimeout(() => {
      setShowCompleteModal(false);
    }, 3000);
  };

  const actuators = [
    {
      id: "dc-motor",
      name: "Motor DC",
      icon: Fan,
      description: "Motor yang berputar dengan arus listrik searah",
      application: "Robot beroda, kipas, mainan",
      workingPrinciple: "Menggunakan elektromagnet untuk menghasilkan putaran",
      color: "from-blue-500 to-cyan-500",
      interactive: true,
    },
    {
      id: "servo",
      name: "Motor Servo",
      icon: Gauge,
      description: "Motor yang dapat dikontrol posisi sudutnya",
      application: "Lengan robot, kamera PTZ, RC plane",
      workingPrinciple: "Menggunakan feedback posisi untuk kontrol presisi",
      color: "from-purple-500 to-pink-500",
      interactive: true,
    },
    {
      id: "led",
      name: "LED",
      icon: Lightbulb,
      description: "Dioda yang memancarkan cahaya",
      application: "Indikator, lampu, display",
      workingPrinciple: "Elektron melewati semikonduktor dan memancarkan foton",
      color: "from-yellow-500 to-orange-500",
      interactive: true,
    },
    {
      id: "relay",
      name: "Relay",
      icon: Zap,
      description: "Saklar elektromagnetik",
      application: "Kontrol perangkat daya tinggi, sistem otomasi",
      workingPrinciple: "Elektromagnet menggerakkan kontak saklar",
      color: "from-green-500 to-teal-500",
      interactive: false,
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <Link href="/">
            <Button variant="secondary">
              <ArrowLeft className="w-5 h-5 mr-2 inline" />
              Kembali
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-white">⚙️ Modul Aktuator</h1>
          <Button
            onClick={handleComplete}
            variant={isCompleted ? "secondary" : "primary"}
            className={isCompleted ? "opacity-75" : ""}
          >
            {isCompleted ? (
              <>
                <CheckCircle className="w-5 h-5 mr-2 inline" />
                Selesai ✓
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5 mr-2 inline" />
                Tandai Selesai
              </>
            )}
          </Button>
        </div>{" "}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8 text-white"
        >
          <h2 className="text-2xl font-bold mb-3">🔌 Apa itu Aktuator?</h2>
          <p className="text-lg">
            Aktuator adalah komponen yang mengubah sinyal listrik menjadi
            gerakan fisik atau aksi lainnya. Jika sensor adalah "mata dan
            telinga" sistem, maka aktuator adalah "tangan dan kaki"nya!
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {actuators.map((actuator, index) => {
            const Icon = actuator.icon;
            return (
              <motion.div
                key={actuator.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  gradient={actuator.color}
                  onClick={() => setSelectedActuator(actuator)}
                >
                  <Icon className="w-12 h-12 text-white mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">
                    {actuator.name}
                  </h3>
                  <p className="text-white/90 mb-4">{actuator.description}</p>
                  <div className="text-white font-semibold">
                    {actuator.interactive ? "🎮 Coba Simulasi →" : "Pelajari →"}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
        {/* Interactive Simulation Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-8 shadow-2xl"
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-900">
            🎮 Simulasi Interaktif
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Motor DC */}
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Motor DC</h3>
              <motion.div
                animate={{ rotate: motorSpeed * 3.6 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center"
              >
                <Fan className="w-16 h-16 text-white" />
              </motion.div>
              <input
                type="range"
                min="0"
                max="100"
                value={motorSpeed}
                onChange={(e) => setMotorSpeed(Number(e.target.value))}
                className="w-full"
              />
              <p className="mt-2 font-semibold text-gray-700">
                Kecepatan: {motorSpeed}%
              </p>
            </div>

            {/* Servo Motor */}
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4 text-gray-900">
                Motor Servo
              </h3>
              <motion.div className="w-32 h-32 mx-auto mb-4 relative">
                <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: servoAngle - 90 }}
                    transition={{ duration: 0.3 }}
                    className="absolute w-2 h-16 bg-white origin-bottom"
                    style={{ bottom: "50%", left: "50%", marginLeft: "-4px" }}
                  />
                  <Gauge className="w-12 h-12 text-white" />
                </div>
              </motion.div>
              <input
                type="range"
                min="0"
                max="180"
                value={servoAngle}
                onChange={(e) => setServoAngle(Number(e.target.value))}
                className="w-full"
              />
              <p className="mt-2 font-semibold text-gray-700">
                Sudut: {servoAngle}°
              </p>
            </div>

            {/* LED */}
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4 text-gray-900">LED</h3>
              <motion.div
                animate={{ opacity: ledBrightness / 100 }}
                className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg"
                style={{
                  boxShadow: `0 0 ${ledBrightness}px rgba(251, 191, 36, ${
                    ledBrightness / 100
                  })`,
                }}
              >
                <Lightbulb className="w-16 h-16 text-white" />
              </motion.div>
              <input
                type="range"
                min="0"
                max="100"
                value={ledBrightness}
                onChange={(e) => setLedBrightness(Number(e.target.value))}
                className="w-full"
              />
              <p className="mt-2 font-semibold text-gray-700">
                Kecerahan: {ledBrightness}%
              </p>
            </div>
          </div>
        </motion.div>
        {/* Detail Modal */}
        <Modal
          isOpen={selectedActuator !== null}
          onClose={() => setSelectedActuator(null)}
          title={selectedActuator?.name}
          size="lg"
        >
          {selectedActuator && (
            <div className="space-y-6">
              <div
                className={`bg-gradient-to-br ${selectedActuator.color} rounded-xl p-8 text-white`}
              >
                {(() => {
                  const Icon = selectedActuator.icon;
                  return <Icon className="w-20 h-20 mx-auto" />;
                })()}
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  📝 Deskripsi
                </h3>
                <p className="text-gray-700">{selectedActuator.description}</p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  ⚙️ Prinsip Kerja
                </h3>
                <p className="text-gray-700">
                  {selectedActuator.workingPrinciple}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  🔧 Aplikasi
                </h3>
                <p className="text-gray-700">{selectedActuator.application}</p>
              </div>
            </div>
          )}
        </Modal>
        {/* Completion Confirmation Modal */}
        <Modal
          isOpen={showCompleteModal}
          onClose={() => setShowCompleteModal(false)}
          title="Selesai"
          size="sm"
        >
          <div className="text-center space-y-4 p-4">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
            <h3 className="text-lg font-bold">Selamat!</h3>
            <p className="text-gray-700">
              Module Aktuator telah ditandai selesai. Level berikutnya akan
              terbuka jika persyaratan terpenuhi.
            </p>
            <div className="pt-3">
              <Button
                onClick={() => setShowCompleteModal(false)}
                variant="primary"
              >
                OK
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </main>
  );
}
