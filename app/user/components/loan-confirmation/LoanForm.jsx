'use client'

import React from 'react';
import { User, Users, Calendar, Clock } from 'lucide-react';

const LoanForm = ({
  studentName,
  setStudentName,
  studentClass,
  setStudentClass,
  selectedDuration,
  setSelectedDuration,
  errors,
  handleConfirm,
  handleBack,
  loanDetails = {}
}) => {
  
  // Ambil nilai dengan default
  const { 
    borrowDate = 'Loading...', 
    returnDate = 'Loading...', 
    duration = 'Loading...' 
  } = loanDetails;

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 p-8">
        <h2 className="text-3xl font-bold text-white mb-2">Loan Confirmation</h2>
        <p className="text-white text-opacity-90">Complete your loan information</p>
      </div>

      <div className="p-8">
        {/* Student Information Form */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Student Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <User className="inline mr-2" size={16} />
                Student Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Enter full name"
                className={`w-full px-4 py-3 rounded-xl border-2 ${
                  errors.studentName ? 'border-red-400' : 'border-gray-200'
                } focus:border-purple-500 focus:outline-none transition-all`}
              />
              {errors.studentName && (
                <p className="text-red-500 text-sm mt-1">{errors.studentName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Users className="inline mr-2" size={16} />
                Class <span className="text-red-500">*</span>
              </label>
              <select
                value={studentClass}
                onChange={(e) => setStudentClass(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border-2 ${
                  errors.studentClass ? 'border-red-400' : 'border-gray-200'
                } focus:border-purple-500 focus:outline-none transition-all bg-white`}
              >
                <option value="">Select Class</option>
                <option value="XI RPL 1">XI RPL 1</option>
                <option value="XI RPL 2">XI RPL 2</option>
                <option value="XI RPL 3">XI RPL 3</option>
                <option value="XI RPL 4">XI RPL 4</option>
                <option value="XI RPL 5">XI RPL 5</option>
              </select>
              {errors.studentClass && (
                <p className="text-red-500 text-sm mt-1">{errors.studentClass}</p>
              )}
            </div>
          </div>
        </div>

        {/* Loan Details Section */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Loan Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border-2 border-blue-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg">
                  <Calendar className="text-white" size={20} />
                </div>
                <p className="text-sm font-semibold text-gray-700">Borrow Date</p>
              </div>
              <p className="text-lg font-bold text-gray-800">{borrowDate}</p>
            </div>

            <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
                  <Calendar className="text-white" size={20} />
                </div>
                <p className="text-sm font-semibold text-gray-700">Return Date</p>
              </div>
              <p className="text-lg font-bold text-gray-800">{returnDate}</p>
            </div>

            <div className="p-4 bg-gradient-to-br from-pink-50 to-blue-50 rounded-xl border-2 border-pink-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-gradient-to-r from-pink-500 to-blue-500 p-2 rounded-lg">
                  <Clock className="text-white" size={20} />
                </div>
                <p className="text-sm font-semibold text-gray-700">Duration</p>
              </div>
              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none bg-white font-semibold text-gray-800"
              >
                <option value={7}>7 days</option>
                <option value={14}>14 days</option>
                <option value={21}>21 days</option>
              </select>
              <p className="text-sm text-gray-500 mt-2">Return by: {returnDate}</p>
            </div>
          </div>
        </div>

        {/* Warning Note */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-xl mb-8">
          <div className="flex gap-3">
            <div className="text-yellow-600">⚠️</div>
            <div>
              <p className="font-semibold text-yellow-800 mb-1">Important Notice</p>
              <p className="text-sm text-yellow-800">
                Please return the book before the due date to avoid late fees. 
                Make sure the information you entered is correct before confirming.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleBack}
            className="flex-1 py-4 px-6 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 py-4 px-6 bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
          >
            Confirm Loan
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoanForm;
