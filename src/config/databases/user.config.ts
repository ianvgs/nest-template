const DatabaseConfig = () => ({
  type: 'mysql',
  host: process.env.USER_HOST,
  username: process.env.USER_USERNAME,
  password: process.env.USER_PASSWORD,
  database: process.env.USER_DATABASE,
  port: parseInt(process.env.USER_PORT),
  synchronize: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
  autoLoadEntities: true,
  /*  "migrations": ["dist/migrations/*{.ts,.js}"],
   "migrationsTableName": "migrations_typeorm",
   "migrationsRun": true */
})

export default DatabaseConfig

