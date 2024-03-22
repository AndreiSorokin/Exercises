describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "name1",
      username: "userName1",
      password: "password1",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:5173");
  });

  it("Login form is shown", function () {
    cy.contains("Log in to application");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("userName1");
      cy.get("#password").type("password1");
      cy.get("#login-button").click();

      cy.contains("name1 logged in");
    });

    it("login fails with wrong credentials", function () {
      cy.get("#username").type("userName1");
      cy.get("#password").type("wrong");
      cy.get("#login-button").click();

      cy.get(".error-message")
        .should("contain", "Wrong username or password")
        .and("have.css", "color", "rgb(214, 10, 10)")
        .and("have.css", "border-style", "solid");

      cy.contains("name1 logged in").should("not.exist");
    });
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: "userName1", password: "password1" });
    });

    it("a new blog can be created", function () {
      cy.createBlog({
        title: "a blog created by cypress",
        url: "url by cypress",
        author: "author by cypress",
      });
      cy.contains("New blog").click();
      cy.contains('"a blog created by cypress" by author by cypress');
    });

    describe("and a blog exists", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "another blog created by cypress",
          url: "another url by cypress",
          author: "another author by cypress",
        });
      });

      it("it can be shown", function () {
        cy.contains("New blog").click();
        cy.contains("another blog created by cypress");
        cy.contains("Show").click();

        cy.contains("another url by cypress");
        cy.contains("Cancel");
      });

      it("users can like a blog", function () {
        cy.contains("New blog").click();
        cy.contains("another blog created by cypress");
        cy.contains("Show").click();
        cy.contains("Likes: 0");

        cy.contains("Like").click();
        cy.contains("Likes: 1");
      });

      it("user who created a blog can delete it", function () {
        cy.contains("New blog").click();
        cy.contains("another blog created by cypress");
        cy.contains("Show").click();

        cy.contains("Delete").click();
        cy.should("not.contain", "another blog created by cypress");
      });

      it("only the creator can see the delete button of a blog", function () {
        cy.contains("New blog").click();
        cy.contains("another blog created by cypress");
        cy.contains("Show").click();

        cy.createBlog({
          title: "blog for delete test",
          url: "url by cypress",
          author: "author by cypress",
        });

        cy.contains("Log out").click();
        cy.contains("Log in to application");

        const otherUser = {
          username: "testUser2",
          password: "password2",
        };
        cy.request("POST", "http://localhost:3003/api/users/", otherUser);
        cy.login(otherUser);
        cy.visit("http://localhost:5173");

        cy.contains("New blog").click();
        cy.contains("blog for delete test").click();
        cy.get(".blog").should("not.contain", "Delete");
      });

      it("blogs are ordered according to likes", function () {
        cy.contains("New blog").click();

        cy.createBlog({
          title: "Blog with 1 like",
          url: "url1",
          author: "author1",
        });
        cy.createBlog({
          title: "Blog with 2 likes",
          url: "url1",
          author: "author1",
        });

        cy.contains("New blog").click();

        cy.get(".blog").eq(1).should("contain", "Blog with 1 like");
        cy.get(".blog").eq(1).contains("Show").click();
        cy.contains("Blog with 1 like").parent().find(".button-like").click();

        cy.get(".blog").eq(2).should("contain", "Blog with 2 likes");
        cy.get(".blog").eq(2).contains("Show").click();
        cy.contains("Blog with 2 likes").parent().find(".button-like").click();
        cy.get(".blog").eq(1).contains("Likes").click();
        cy.contains("Blog with 2 likes").parent().find(".button-like").click();

        cy.get(".blog").eq(0).should("contain", "Blog with 2 likes");
      });
    });
  });
});
