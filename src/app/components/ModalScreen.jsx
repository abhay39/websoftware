import React from 'react';
import { Quicksand } from "next/font/google";

const quicksand = Quicksand({
  display: "swap",
  subsets: ["latin"],
  weight: "700"
});
const quicksand1 = Quicksand({
  display: "swap",
  subsets: ["latin"],
  weight: "600"
});

const Modal = ({ isOpen, onClose, user }) => {
  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 overflow-y-auto ${quicksand1.className}`}>
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;

        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                {/* You can customize the icon or image here */}
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                  User Details
                </h3>
                <div className="mt-2">
                  {/* Display user details here */}
                  <p className="text-sm text-gray-500">{`Name: ${user.firstName} ${user.lastName}`}</p>
                  <p className="text-sm text-gray-500">{`Username: ${user.username}`}</p>
                  <p className="text-sm text-gray-500">{`Email: ${user.email}`}</p>
                  <p className="text-sm text-gray-500">{`Phone: ${user.phone}`}</p>
                  <p className="text-sm text-gray-500">{`Address: ${user.address}`}</p>
                  <p className="text-sm text-gray-500">{`City: ${user.city}`}</p>
                  <p className="text-sm text-gray-500">{`ZIP: ${user.zip}`}</p>
                  <p className="text-sm text-gray-500">{`Country: ${user.country}`}</p>
                  <p className="text-sm text-gray-500">{`Role: ${user.role}`}</p>
                  {/* Add more details as needed */}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={onClose}
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
