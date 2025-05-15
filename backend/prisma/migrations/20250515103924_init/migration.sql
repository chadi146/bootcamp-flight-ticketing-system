-- Enum types
CREATE TYPE "Role" AS ENUM ('user', 'admin');
CREATE TYPE "BookingStatus" AS ENUM ('confirmed', 'cancelled');
CREATE TYPE "PaymentStatus" AS ENUM ('accepted', 'failed');

-- Table: "User"
CREATE TABLE "User" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL UNIQUE,
  "password" TEXT NOT NULL,
  "role" "Role" NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT NOW()
);

-- Table: "Flight"
CREATE TABLE "Flight" (
  "id" SERIAL PRIMARY KEY,
  "flightNumber" TEXT NOT NULL,
  "origin" TEXT NOT NULL,
  "destination" TEXT NOT NULL,
  "departureTime" TIMESTAMP(3) NOT NULL,
  "durationMinutes" INTEGER NOT NULL,
  "price" NUMERIC(10, 2) NOT NULL,
  "seats" INTEGER NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT NOW()
);

-- Table: "Booking"
CREATE TABLE "Booking" (
  "id" SERIAL PRIMARY KEY,
  "userId" INTEGER NOT NULL,
  "flightId" INTEGER NOT NULL,
  "status" "BookingStatus" NOT NULL,
  "bookingDate" TIMESTAMP(3) NOT NULL DEFAULT NOW(),
  CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "Booking_flightId_fkey" FOREIGN KEY ("flightId") REFERENCES "Flight" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Table: "Payment"
CREATE TABLE "Payment" (
  "id" SERIAL PRIMARY KEY,
  "bookingId" INTEGER NOT NULL UNIQUE,
  "amount" NUMERIC(10, 2) NOT NULL,
  "status" "PaymentStatus" NOT NULL,
  "paymentDate" TIMESTAMP(3) NOT NULL DEFAULT NOW(),
  CONSTRAINT "Payment_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
