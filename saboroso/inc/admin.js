var conn = require("./db");

module.exports = {
  dashboard() {
    return new Promise((resolve, reject) => {
      conn.query(
        `
            SELECT
                (SELECT COUNT(*) FROM tb_contacts) AS nrContacts,
                (SELECT COUNT(*) FROM tb_menus) AS nrMenus,
                (SELECT COUNT(*) FROM tb_reservations) AS nrReservations,
                (SELECT COUNT(*) FROM tb_users) AS nrUsers;
            `,
        (error, results) => {
          if (error) reject(error);
          else resolve(results[0]);
        }
      );
    });
  },

  getParams(req, params) {
    return Object.assign(
      {},
      {
        menus: req.menus,
        user: req.session.user,
      },
      params
    );
  },

  getMenus(req) {
    let menus = [
      {
        text: "Tela Inicial",
        href: "/admin/",
        icon: "home",
        active: false,
      },
      {
        text: "Menu",
        href: "/admin/menus",
        icon: "cutlery",
        active: false,
      },
      {
        text: "Reservas",
        href: "/admin/reservations",
        icon: "calendar-check-o",
        active: false,
      },
      {
        text: "Contatos",
        href: "/admin/contacts",
        icon: "comments",
        active: false,
      },
      {
        text: "Usuários",
        href: "/admin/users",
        icon: "users",
        active: false,
      },
      {
        text: "E-mails",
        href: "/admin/emails",
        icon: "envelope",
        active: false,
      },
    ];
    menus.map((menu) => {
      if (menu.href === `/admin${req.url}`) menu.active = true;
      console.log(req.url, menu.href);
    });

    return menus;
  },
};
