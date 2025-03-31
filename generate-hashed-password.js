import crypto from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(crypto.scrypt);

async function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const buf = await scryptAsync(password, salt, 64);
  return `${buf.toString('hex')}.${salt}`;
}

async function main() {
  const adminPass = await hashPassword('admin123');
  const salesPass = await hashPassword('sales123');
  
  console.log('Admin hash:', adminPass);
  console.log('Sales hash:', salesPass);
}

main().catch(console.error);