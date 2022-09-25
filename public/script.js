const getAccountDetails = () => {
  let accountName = $("#selectedAccount").find("option:selected").text();
  let accountId = $("#selectedAccount").find("option:selected").val();
  if (accountId != 0) {
    let accountData = {};
    accountData.accountId = accountId;
    accountData.accountName = accountName;
    let successFunc = (data) => {
      data = JSON.parse(data)[0];
      console.log(data);
      $("#accountDetailID").text("Account ID - " + data.id);
      $("#senderAccountID").val(data.id);
      $("#accountLegend").text(data.name);
      $("#accountDetailBalance").text("Balance : " + data.balance + " YOMs");
      $("#accountDetails").show();
    };
    let errorFunc = (data) => {
      console.log(data);
    };
    $.ajax({
      url: "/getAccount",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(accountData),
      success: successFunc,
      error: errorFunc,
    });
  }
};
