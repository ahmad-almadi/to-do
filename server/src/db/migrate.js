import pool from './config.js';

const createTables = async () => {
  try {
    console.log('🔄 Running database migrations...');
    
    await pool.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        assigned_to TEXT[] DEFAULT '{}',
        priority VARCHAR(20) DEFAULT 'medium',
        status VARCHAR(20) DEFAULT 'todo',
        deadline DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
      CREATE INDEX IF NOT EXISTS idx_tasks_assigned_to ON tasks USING GIN(assigned_to);
    `);

    console.log('✅ Database tables created successfully');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
};

createTables();
