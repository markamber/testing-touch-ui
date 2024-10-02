import { sveltekit } from '@sveltejs/kit/vite';
import { Server } from 'socket.io
import { type ViteDevServer, defineConfig } from 'vite';

const webSocketServer = {
	name: 'websocket',
	configureServer(server: ViteDevServer) {
		if (!server.httpServer) return;

		const io = new Server(server.httpServer);

		io.on('connection', (connection) => {
			connection.emit('eventFromServer', '✅ Connected');
		});
	}
};

export default defineConfig({
	plugins: [sveltekit()]
});
