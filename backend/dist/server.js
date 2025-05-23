"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const prisma_1 = __importDefault(require("./config/prisma"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Ensure env vars are loaded
const PORT = process.env.PORT || 5000;
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Test DB connection
        yield prisma_1.default.$connect();
        console.log('✅ Connected to database');
        const server = app_1.default.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
        // Graceful shutdown
        const shutdown = () => __awaiter(void 0, void 0, void 0, function* () {
            console.log('\n🔌 Shutting down gracefully...');
            yield prisma_1.default.$disconnect();
            server.close(() => {
                console.log('🛑 Server closed');
                process.exit(0);
            });
        });
        process.on('SIGINT', shutdown);
        process.on('SIGTERM', shutdown);
    }
    catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
});
startServer();
//# sourceMappingURL=server.js.map