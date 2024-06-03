import Users from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const Register = async (req, res) => {
   try {
      const { name, email, password, confPassword, avatarUrl } = req.body;
      if (password !== confPassword) {
         return res
            .status(400)
            .json({ msg: 'Пароль и Подтвержденный пароль не сходятся' });
      }
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(password, salt);

      await Users.create({
         name: name,
         email: email,
         password: hashPassword,
         avatarUrl: avatarUrl,
      }).then((response) => {
         const userid = response.id;
         const token = jwt.sign({ id: userid }, 'secretword123', {
            expiresIn: '30d',
         });
         res.json({ userid, token });
      });
   } catch (error) {
      console.log(error);
   }
};

export const Login = async (req, res) => {
   try {
      const user = await Users.findAll({
         where: {
            email: req.body.email,
         },
      });
      const isValidPass = await bcrypt.compare(
         req.body.password,
         user[0].password
      );
      if (!isValidPass) return res.status(400).json({ msg: 'Неверный пароль' });

      const userId = user[0].id;
      const name = user[0].name;
      const email = user[0].email;
      const role = user[0].role;
      const avatarUrl = user[0].avatarUrl;

      const token = jwt.sign(
         { userId, name, email, role, avatarUrl },
         'secretword123',
         {
            expiresIn: '30d',
         }
      );
      res.cookie('token', token, {
         httpOnly: true,
         maxAge: 24 * 60 * 60 * 1000,
      });
      res.json({ userId, name, token });
   } catch (error) {
      res.status(404), json({ msg: 'Email не найден' });
   }
};

export const getMe = async (req, res) => {
   try {
      const user = await Users.findAll({
         where: {
            id: req.userId,
         },
      });
      if (!user) {
         return res.status(404).json({
            message: 'Пользователь не найден',
         });
      }
      const userId = user[0].id;
      const name = user[0].name;
      const email = user[0].email;
      const role = user[0].role;
      const avatar = user[0].avatarUrl;
      const createdAt = user[0].createdAt;
      const updatedAt = user[0].updatedAt;
      res.json({ userId, name, email, role, avatar, createdAt, updatedAt });
   } catch (err) {
      return res.status(403).json({
         message: 'Запрос не принят',
      });
   }
};

export const getUsers = async (req, res) => {
   try {
      const users = await Users.findAll({
         attributes: ['id', 'name', 'email', 'role'],
      });
      res.json(users);
   } catch (error) {
      console.log(error);
   }
};
export const getUserById = async (req, res) => {
   try {
       const users = await Users.findAll({
           where: { id: req.params.id },
       });
       res.json(users[0])
   } catch (error) {
       res.json({ message: error.message });
   }
};

export const updateUser = async (req, res) => {
   try {
      const { name, password, avatarUrl, email } = req.body;

      const user = await Users.findOne({
         where: {
            email: email,
         },
      });

      if (!user) {
         return res.status(404).json({
            message: 'Пользователь не найден',
         });
      }

      // Обновляем только переданные данные
      if (name) {
         user.name = name;
      }

      if (password) {
         const salt = await bcrypt.genSalt();
         const hashPassword = await bcrypt.hash(password, salt);
         user.password = hashPassword;
      }

      if (avatarUrl) {
         user.avatarUrl = avatarUrl;
      }

      // Сохраняем обновленного пользователя
      await user.save();

      // Создаем новый токен с обновленными данными
      const token = jwt.sign(
         {
            userId: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatarUrl: user.avatarUrl,
         },
         'secretword123',
         {
            expiresIn: '30d',
         }
      );

      res.json({ userId: user.id, name: user.name, token });
   } catch (error) {
      console.error('Ошибка обновления данных пользователя:', error);
      res.status(500).json({ msg: 'Internal Server Error' });
   }
};
export const deleteUser = async (req, res) => {
   try {
       await Users.destroy({
           where: { id: req.params.id },
       });
       res.json({ message: 'Пользователь удален' });
   }   catch (error) {
       res.json({message: error.message});
   }
};
export const updateUserById = async (req, res) => {
   try {
       await Users.update(req.body, {
           where: {id: req.params.id},
       });
       res.json({ message: 'Данные пользователя успешно изменены' });
   } catch (error) {
       res.json({ message: error.message });
   }
};
