"use client";

import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import Navbar from "@/components/navbar";

const ReceiptScanner = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [receiptItems, setReceiptItems] = useState<string[]>([]);
  const [esgValues, setEsgValues] = useState<string[]>([]);
  const webcamRef = useRef<Webcam>(null);
  const [cameraOpen, setCameraOpen] = useState(false);

  const openCamera = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraOpen(true);
    } catch (error) {
      console.error("Camera access denied:", error);
      alert("Please allow camera permissions in your browser.");
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setCapturedImage(null); // Clear captured image if a file is uploaded
    }
  };

  const handleCapture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setCapturedImage(imageSrc);
        setSelectedFile(null); // Clear uploaded file if live image is taken
        setCameraOpen(false); // Close the camera
      }
    }
  };

  const handleUpload = () => {
    if (!selectedFile && !capturedImage) {
      alert("Please upload a file or take a picture first.");
      return;
    }

    // Simulated receipt processing
    const sampleReceiptItems = ["Apple", "Banana", "Orange"];
    const sampleEsgValues = ["Low", "Moderate", "High"];
    setReceiptItems(sampleReceiptItems);
    setEsgValues(sampleEsgValues);

    // Clear inputs
    setSelectedFile(null);
    setCapturedImage(null);
  };

  return (
    <div className="overscroll-x-none">
      {/* Header */}
      <div className="w-full h-16 flex justify-center items-center text-lg">
        EcoBack
      </div>
      <div className="bg-sky-900 h-24">
        <h1 className="text-white text-4xl align-middle font-bold px-6">
          Receipt Scanner
        </h1>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg mb-24">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Upload or Capture Your Receipt
        </h1>

        {/* Upload Section */}
        {!receiptItems.length && (
          <div className="flex flex-col items-center gap-4">
            {/* File Upload */}
            <label className="flex flex-col items-center w-full cursor-pointer">
              <span className="btn btn-outline btn-primary w-48">
                Choose File
              </span>
              <input
                type="file"
                accept=".png,.jpg,.jpeg,.pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            {/* Open Camera */}
            <button
              onClick={() => (cameraOpen ? setCameraOpen(false) : openCamera())}
              className={`btn w-48 ${cameraOpen ? "btn-error" : "btn-primary"}`}
            >
              {cameraOpen ? "Close Camera" : "Open Camera"}
            </button>

            {/* Camera Section */}
            {cameraOpen && (
              <div className="flex flex-col items-center gap-4">
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  className="rounded-lg border border-gray-300"
                />
                <button onClick={handleCapture} className="btn btn-success">
                  Capture
                </button>
              </div>
            )}

            {/* Upload Button */}
            {(selectedFile || capturedImage) && (
              <button
                onClick={handleUpload}
                className="btn btn-success w-48 mt-4"
              >
                Process Receipt
              </button>
            )}
          </div>
        )}

        {/* Receipt Table Section */}
        {receiptItems.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-bold text-center text-gray-700 mb-4">
              Receipt Items and ESG Values
            </h2>
            <div className="overflow-x-auto">
              <table className="table w-full border border-gray-300">
                <thead>
                  <tr>
                    <th className="bg-primary text-white font-semibold text-lg">
                      Item
                    </th>
                    <th className="bg-primary text-white font-semibold text-lg">
                      ESG Value
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {receiptItems.map((item, index) => (
                    <tr
                      key={index}
                      className={
                        index % 2 === 0
                          ? "bg-gray-100 hover:bg-gray-200"
                          : "bg-white hover:bg-gray-100"
                      }
                    >
                      <td className="border border-gray-300 px-4 py-3 text-gray-800 text-base">
                        {item}
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-800 text-base">
                        {esgValues[index] || "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Upload Another Button */}
            <div className="text-center mt-6">
              <button
                onClick={() => {
                  setReceiptItems([]);
                  setEsgValues([]);
                }}
                className="btn btn-primary"
              >
                Upload Another Receipt
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Navbar */}
      <Navbar />
    </div>
  );
};

export default ReceiptScanner;
