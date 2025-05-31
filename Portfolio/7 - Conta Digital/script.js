document.addEventListener("DOMContentLoaded", function () {
  const currentBalance = document.getElementById("currentBalance");
  const totalIn = document.getElementById("totalIn");
  const totalOut = document.getElementById("totalOut");
  const transactionList = document.getElementById("transactionList");
  const noTransactionsMessage = document.getElementById(
    "noTransactionsMessage"
  );

  const pixAreaBtn = document.getElementById("pixAreaBtn");
  const payBtn = document.getElementById("payBtn");
  const investBtn = document.getElementById("investBtn");

  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modalTitle");
  const modalMessage = document.getElementById("modalMessage");
  const modalBtn = document.getElementById("modalBtn");

  let balance = 0.0;
  let totalInValue = 0.0;
  let totalOutValue = 0.0;
  let transactions = [];
  let showingPix = false;

  const defaultTransactionsContent =
    document.getElementById("rightContent").innerHTML;

  const pixContent = `
                <div class="pix-tabs">
                    <button class="pix-tab active" data-tab="receive">Receber</button>
                    <button class="pix-tab" data-tab="transfer">Transferir</button>
                </div>
                <form id="receiveForm" class="pix-form active">
                    <div class="form-group">
                        <label for="receiverCpf">CPF/CNPJ do destinatário</label>
                        <input type="text" id="receiverCpf" placeholder="000.000.000-00" maxlength="18">
                        <div class="error-message" id="receiverCpfError">Todos os campos devem ser preenchidos!</div>
                    </div>
                    <div class="form-group">
                        <label for="receiveAmount">Valor (R$)</label>
                        <input type="number" id="receiveAmount" placeholder="0,00" step="0.01" min="0.01">
                        <div class="error-message" id="receiveAmountError">Todos os campos devem ser preenchidos!</div>
                    </div>
                    <button type="submit" class="submit-btn">Receber</button>
                </form>
                <form id="transferForm" class="pix-form">
                    <div class="form-group">
                        <label for="pixKey">Chave PIX</label>
                        <input type="text" id="pixKey" placeholder="Chave PIX (CPF, e-mail, telefone ou chave aleatória)">
                        <div class="error-message" id="pixKeyError">Todos os campos devem ser preenchidos!</div>
                    </div>
                    <div class="form-group">
                        <label for="transferAmount">Valor (R$)</label>
                        <input type="number" id="transferAmount" placeholder="0,00" step="0.01" min="0.01">
                        <div class="error-message" id="transferAmountError">Todos os campos devem ser preenchidos!</div>
                    </div>
                    <button type="submit" class="submit-btn">Transferir</button>
                </form>`;

  pixAreaBtn.addEventListener("click", () => {
    const container = document.getElementById("rightContent");
    if (!showingPix) {
      container.innerHTML = pixContent;
      initPixEvents();
    } else {
      container.innerHTML = defaultTransactionsContent;
    }
    showingPix = !showingPix;
  });

  payBtn.addEventListener("click", () => {
    showingPix = false;
    document.getElementById("rightContent").innerHTML =
      "<h2>Pagamento</h2><p>Sistema indisponível no momento.</p>";
  });

  investBtn.addEventListener("click", () => {
    showingPix = false;
    document.getElementById("rightContent").innerHTML =
      "<h2>Investimentos</h2><p>Sistema indisponível no momento.</p>";
  });

  modalBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });

  function initPixEvents() {
    const receiverCpf = document.getElementById("receiverCpf");
    const receiveForm = document.getElementById("receiveForm");
    const transferForm = document.getElementById("transferForm");
    const pixTabs = document.querySelectorAll(".pix-tab");

    receiverCpf.addEventListener("input", function (e) {
      let value = e.target.value.replace(/\D/g, "");
      if (value.length <= 11) {
        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
      } else {
        value = value.replace(/^(\d{2})(\d)/, "$1.$2");
        value = value.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
        value = value.replace(/\.(\d{3})(\d)/, ".$1/$2");
        value = value.replace(/(\d{4})(\d)/, "$1-$2");
      }
      e.target.value = value;
    });

    pixTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        pixTabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        const tabName = tab.getAttribute("data-tab");
        document
          .querySelectorAll(".pix-form")
          .forEach((form) => form.classList.remove("active"));
        document.getElementById(`${tabName}Form`).classList.add("active");
      });
    });

    receiveForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const cpf = document.getElementById("receiverCpf").value;
      const amount = parseFloat(document.getElementById("receiveAmount").value);
      if (!cpf || !amount || amount <= 0) {
        showErrorMessages("receive");
        return;
      }
      processTransaction("in", cpf, amount);
      this.reset();
      hideErrorMessages("receive");
    });

    transferForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const pixKey = document.getElementById("pixKey").value;
      const amount = parseFloat(
        document.getElementById("transferAmount").value
      );
      if (!pixKey || !amount || amount <= 0) {
        showErrorMessages("transfer");
        return;
      }
      if (amount > balance) {
        showModal(
          "Saldo insuficiente",
          "Você não tem saldo suficiente para realizar esta transferência."
        );
        return;
      }
      processTransaction("out", pixKey, amount);
      this.reset();
      hideErrorMessages("transfer");
    });
  }

  function showModal(title, message) {
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    modal.style.display = "flex";
  }

  function showErrorMessages(formType) {
    if (formType === "receive") {
      document.getElementById("receiverCpfError").style.display = "block";
      document.getElementById("receiveAmountError").style.display = "block";
    } else {
      document.getElementById("pixKeyError").style.display = "block";
      document.getElementById("transferAmountError").style.display = "block";
    }
  }

  function hideErrorMessages(formType) {
    if (formType === "receive") {
      document.getElementById("receiverCpfError").style.display = "none";
      document.getElementById("receiveAmountError").style.display = "none";
    } else {
      document.getElementById("pixKeyError").style.display = "none";
      document.getElementById("transferAmountError").style.display = "none";
    }
  }

  function processTransaction(type, destination, amount) {
    if (type === "in") {
      balance += amount;
      totalInValue += amount;
    } else {
      balance -= amount;
      totalOutValue += amount;
    }

    currentBalance.textContent = balance.toFixed(2).replace(".", ",");
    totalIn.textContent = totalInValue.toFixed(2).replace(".", ",");
    totalOut.textContent = totalOutValue.toFixed(2).replace(".", ",");

    const now = new Date();
    const dateStr = `${now.getDate().toString().padStart(2, "0")}/${(
      now.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${now.getFullYear()}`;
    const timeStr = `${now.getHours().toString().padStart(2, "0")}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;
    const idStr = `${now.getFullYear()}${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}${now.getDate().toString().padStart(2, "0")}${now
      .getHours()
      .toString()
      .padStart(2, "0")}${now.getMinutes().toString().padStart(2, "0")}${now
      .getSeconds()
      .toString()
      .padStart(2, "0")}`;

    const transaction = {
      type: type,
      title: type === "in" ? "Entrada" : "Saída",
      description:
        type === "in" ? "Transferência recebida" : "Transferência enviada",
      from: destination,
      id: idStr,
      date: `${dateStr} - ${timeStr}`,
      value: amount,
    };

    addTransaction(transaction);
    showModal("Transação realizada", "Transação realizada com sucesso!");
  }

  function addTransaction(transaction) {
    if (transactions.length === 0) {
      noTransactionsMessage.style.display = "none";
    }
    transactions.unshift(transaction);
    transactionList.innerHTML = "";
    transactions.forEach((t) => {
      const li = document.createElement("li");
      li.className = "transaction-item";
      const infoDiv = document.createElement("div");
      infoDiv.className = "transaction-info";
      const typeDiv = document.createElement("div");
      typeDiv.className = "transaction-type";
      typeDiv.textContent = `${t.title} | ${t.description}`;
      const detailsDiv = document.createElement("div");
      detailsDiv.className = "transaction-details";
      detailsDiv.innerHTML = `De: ${t.from}<br>ID: ${t.id}<br>${t.date}`;
      const valueDiv = document.createElement("div");
      valueDiv.className = `transaction-value ${
        t.type === "in" ? "incoming" : "outgoing"
      }`;
      valueDiv.textContent = `R$ ${t.value.toFixed(2).replace(".", ",")}`;
      infoDiv.appendChild(typeDiv);
      infoDiv.appendChild(detailsDiv);
      li.appendChild(infoDiv);
      li.appendChild(valueDiv);
      transactionList.appendChild(li);
    });
  }
});
