CREATE DATABASE GameStore
GO 
USE GameStore
GO

CREATE TABLE NhomChucNang(
    ID_NhomChucNang VARCHAR(20) PRIMARY KEY NOT NULL,--ID sẽ tự sinh có dạng ID="NCN"+list.size()
    TenNhomChucNang NVARCHAR(50)
)
GO
CREATE TABLE ChucNang(
    ID_ChucNang VARCHAR(20) NOT NULL PRIMARY KEY,--ID sẽ tự sinh có dạng (CN1) ---> ID = "CN" + list.size()
    TenChucNang VARCHAR(50), --Tên CN = Tên của table nó tác động, vd : Game, NguoiDung
    Quyen VARCHAR(50), --Xem/Them/Sua/Xoa
)
GO
CREATE TABLE CN_NhomCN(
    ID_CN_NhomCN INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    ID_NhomChucNang VARCHAR(20) NOT NULL FOREIGN KEY REFERENCES NhomChucNang(ID_NhomChucNang),
    ID_ChucNang VARCHAR(20) NOT NULL FOREIGN KEY REFERENCES ChucNang(ID_ChucNang)
)
GO
CREATE TABLE NguoiDung(
    ID_NguoiDung VARCHAR(20) PRIMARY KEY NOT NULL, --ID sẽ tự sinh có dạng (ND) ---> ID = "ND" + list.size()
    NickName NVARCHAR(50),
    UserName_ND VARCHAR(50) NOT NULL,
    Password_ND VARCHAR(200) NOT NULL, --Password sẽ được mã hóa
    TenNguoiDung NVARCHAR(100) NOT NULL,
    GioiTinh BIT DEFAULT(1),
    NgaySinh date,
    Email VARCHAR(100),
    DiaChi Ntext,
    SDT VARCHAR(11),
    AnhDaiDien NVARCHAR(50), --rename ảnh lưu vào thư mục
    UserName_Tao VARCHAR(50), --Có thể không có
    NgayTao DATETIME,
    UserName_CapNhat VARCHAR(50),
    NgayCapNhat datetime,
    ID_NhomChucNang VARCHAR(20) NOT NULL FOREIGN KEY REFERENCES NhomChucNang(ID_NhomChucNang),
)
GO
CREATE TABLE Game(
    ID_Game INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
    Ten_Game NVARCHAR(200) NOT NULL,
    Ten_NhaSanXuat NVARCHAR(100),
    SoHieuPhienBan int,
    PhienBan varchar(10),
    YC_CauHinh NVARCHAR(50),
    LuotTaiXuong INT NOT NULL,
    DanhGiaTB FLOAT NOT NULL,
    GioiHan_Tuoi INT,
    Gia FLOAT NOT NULL,
    MoTaChiTiet ntext,
    UserName_Tao VARCHAR(50) NOT NULL,
    NgayTao datetime,
    UserName_CapNhat VARCHAR(50),
    NgayCapNhat datetime,
    Logo_Game NVARCHAR(50),
	KiemDuyet bit default(0),
	DungLuong int,
	LinkTaiGame varchar(255)
)
/*
ALTER TABLE Game
  ADD KiemDuyet bit default(0);*/
/*
select * from nguoidung
update NguoiDung set Password_ND='123' where ID_NguoiDung = 'ND6'
update Game set KiemDuyet=0 where ID_Game = 1
update Game set UserName_Tao='chi' where ID_Game = 6
*/


GO
CREATE TABLE BinhLuan(
    ID_BinhLuan INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
    DanhGia int NOT NULL,
    NoiDungBL ntext,
    NgayBinhLuan datetime,
    ID_NguoiBinhLuan VARCHAR(20) NOT NULL FOREIGN KEY REFERENCES NguoiDung(ID_NguoiDung),
    ID_Game INT NOT NULL FOREIGN KEY REFERENCES Game(ID_Game)
)
GO
CREATE TABLE HinhAnh(
    ID_AnhMH INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
    AnhMH NVARCHAR(50) NOT NULL, -->Ảnh sẽ được đổi tên và lưu vào trong thư mục
    ID_Game INT NOT NULL FOREIGN KEY REFERENCES Game(ID_Game) 
)
GO
CREATE TABLE TheLoai(
    ID_Loai INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
    TenTheLoai NVARCHAR(50) NOT NULL
)
GO
CREATE TABLE ChiTietGame(
    ID_ChiTietGame INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
    ID_Game INT NOT NULL FOREIGN KEY REFERENCES Game(ID_Game),
    ID_Loai INT NOT NULL FOREIGN KEY REFERENCES TheLoai(ID_Loai)
)
GO
CREATE TABLE GameDaTai(
    ID_GameDaTai INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    CapNhat BIT DEFAULT(0),
    NgayTai DATETIME,
    ID_NguoiDung VARCHAR(20) NOT NULL FOREIGN KEY REFERENCES NguoiDung(ID_NguoiDung),
    ID_Game INT NOT NULL FOREIGN KEY REFERENCES Game(ID_Game)
)
GO
CREATE TABLE YeuThich(
    ID_YeuThich INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    NgayThich DATETIME,
    ID_NguoiDung VARCHAR(20) NOT NULL FOREIGN KEY REFERENCES NguoiDung(ID_NguoiDung),
    ID_Game INT NOT NULL FOREIGN KEY REFERENCES Game(ID_Game)
)
GO
CREATE TABLE Menu(
    ID_Menu INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    TenMenu NVARCHAR(50),
    IconMenu NVARCHAR(50),
    MoTa ntext,
    ID_MenuCha INT FOREIGN KEY REFERENCES Menu(ID_Menu)
)
GO
-----------------------------------Xem NhomChucNang------------------------------------------------------------------
CREATE PROC getNhomChucNang
AS
BEGIN
    SELECT * FROM NhomChucNang 
END
GO
--Thêm NhomChucNang
CREATE PROC createNhomChucNang
(@ID_NhomChucNang VARCHAR(20),@TenNhomChucNang NVARCHAR(50))
AS
BEGIN
    INSERT INTO NhomChucNang(ID_NhomChucNang,TenNhomChucNang) VALUES(@ID_NhomChucNang,@TenNhomChucNang)
END
GO
--Sửa nhóm chức năng
CREATE PROC editNhomChucNang
(@ID_NhomChucNang VARCHAR(20),@TenNhomChucNang NVARCHAR(50))
AS
BEGIN
    UPDATE NhomChucNang
    SET TenNhomChucNang=@TenNhomChucNang
    WHERE ID_NhomChucNang=@ID_NhomChucNang
END
GO
--Xóa NhomChucNang
CREATE PROC deleteNhomChucNang
(@ID_NhomChucNang VARCHAR(20))
AS
BEGIN
    DELETE FROM NhomChucNang
    WHERE ID_NhomChucNang=@ID_NhomChucNang
END
GO

--Xem NhomChucNang theo ID
CREATE PROC detailNhomChucNang
(@ID_NhomChucNang VARCHAR(20))
AS
BEGIN
    SELECT * FROM NhomChucNang WHERE ID_NhomChucNang=@ID_NhomChucNang
END
GO
--đếm nhóm chức năng
CREATE PROC countNhomChucNang
AS
BEGIN
    SELECT COUNT(ID_NhomChucNang) as 'countNCN' FROM NhomChucNang
END
GO

GO
----------------------------------Xem ChucNang----------------------------------------------------------------
CREATE PROC getChucNang
AS
BEGIN
    SELECT * FROM ChucNang 
END
GO
--Thêm ChucNang
CREATE PROC createChucNang
(@ID_ChucNang VARCHAR(20),@TenChucNang VARCHAR(50),@Quyen VARCHAR(50))
AS
BEGIN
    INSERT INTO ChucNang(ID_ChucNang,TenChucNang,Quyen) VALUES(@ID_ChucNang,@TenChucNang,@Quyen)
END
GO
--Sửa ChucNang
CREATE PROC editChucNang
(@ID_ChucNang VARCHAR(20),@TenChucNang VARCHAR(50),@Quyen VARCHAR(50))
AS
BEGIN
    UPDATE ChucNang
    SET TenChucNang=@TenChucNang, Quyen=@Quyen
    WHERE ID_ChucNang=@ID_ChucNang
END
GO
--Xóa ChucNang
CREATE PROC deleteChucNang
(@ID_ChucNang VARCHAR(20))
AS
BEGIN
    DELETE FROM ChucNang
    WHERE ID_ChucNang=@ID_ChucNang
END
GO
--Xem ChucNang theo ID
CREATE PROC detailChucNang
(@ID_ChucNang VARCHAR(20))
AS
BEGIN
    SELECT* FROM ChucNang
    WHERE ID_ChucNang=@ID_ChucNang
END
GO

--đếm chức năng
CREATE PROC countChucNang
AS
BEGIN
    SELECT COUNT(ID_ChucNang) as 'countCN' FROM ChucNang
END
GO
-----------------------------------Xem CN_NhomCN----------------------------------------------------------------
CREATE PROC getCN_NhomCN
AS
BEGIN
    SELECT * FROM CN_NhomCN
END
GO
--Thêm CN_NhomCN
CREATE PROC createCN_NhomCN
(@ID_NhomChucNang VARCHAR(20),@ID_ChucNang VARCHAR(20))
AS
BEGIN
    INSERT INTO CN_NhomCN(ID_NhomChucNang,ID_ChucNang) VALUES(@ID_NhomChucNang,@ID_ChucNang)
END
GO
--Sửa CN_NhomCN
CREATE PROC editCN_NhomCN
(@ID_CN_NhomCN INT,@ID_NhomChucNang VARCHAR(20),@ID_ChucNang VARCHAR(20))
AS
BEGIN
    UPDATE CN_NhomCN
    SET ID_NhomChucNang=@ID_NhomChucNang,ID_ChucNang=@ID_ChucNang
    WHERE ID_CN_NhomCN=@ID_CN_NhomCN
END
GO
--Xóa CN_NhomCN
CREATE PROC deleteCN_NhomCN
(@ID_CN_NhomCN INT)
AS
BEGIN
    DELETE FROM CN_NhomCN
    WHERE ID_CN_NhomCN=@ID_CN_NhomCN
END
GO
--Xem CN_NhomCN theo ID
CREATE PROC detailCN_NhomCN
(@ID_CN_NhomCN INT)
AS
BEGIN
    SELECT* FROM CN_NhomCN
    WHERE ID_CN_NhomCN=@ID_CN_NhomCN
END
GO
-----------------------------------Xem NguoiDung------------------------------------------------------------------
CREATE PROC getNguoiDung
AS
BEGIN
    SELECT * FROM NguoiDung
END
GO
--Thêm NguoiDung
CREATE PROC createNguoiDung
(@ID_NguoiDung VARCHAR(20),@NickName NVARCHAR(50), @UserName_ND VARCHAR(50),@Password_ND VARCHAR(200),@TenNguoiDung NVARCHAR(100),@GioiTinh bit,@NgaySinh varchar(50),@Email VARCHAR(100),@DiaChi NTEXT,
@SDT VARCHAR(11),@AnhDaiDien NVARCHAR(50),@UserName_Tao VARCHAR(50),@NgayTao VARCHAR(50),@UserName_CapNhat VARCHAR(50),@NgayCapNhat VARCHAR(50),@ID_NhomChucNang VARCHAR(20))
AS
BEGIN
    INSERT INTO NguoiDung (ID_NguoiDung,NickName,UserName_ND,Password_ND,TenNguoiDung,GioiTinh,NgaySinh,Email,DiaChi,SDT,AnhDaiDien,UserName_Tao,NgayTao,UserName_CapNhat,NgayCapNhat,ID_NhomChucNang)
    VALUES(@ID_NguoiDung,@NickName, @UserName_ND,@Password_ND,@TenNguoiDung,@GioiTinh,CONVERT(DATE, @NgaySinh,111),@Email,@DiaChi,
            @SDT,@AnhDaiDien,@UserName_Tao,CONVERT(DATETIME, @NgayTao,120),@UserName_CapNhat,CONVERT(DATETIME,@NgayCapNhat,120),@ID_NhomChucNang)
END
GO

--Sửa NguoiDung
CREATE PROC editNguoiDung
(@ID_NguoiDung VARCHAR(20),@NickName NVARCHAR(50), @UserName_ND VARCHAR(50),@Password_ND VARCHAR(200),@TenNguoiDung NVARCHAR(100),@GioiTinh bit,@NgaySinh varchar(50),@Email VARCHAR(100),@DiaChi NTEXT,
@SDT VARCHAR(11),@AnhDaiDien NVARCHAR(50),@UserName_CapNhat VARCHAR(50),@NgayCapNhat VARCHAR(50),@ID_NhomChucNang VARCHAR(20))
AS
BEGIN
    UPDATE NguoiDung
    SET NickName=@NickName,UserName_ND=@UserName_ND,Password_ND=@Password_ND,TenNguoiDung=@TenNguoiDung,GioiTinh=@GioiTinh,NgaySinh=CONVERT(DATE, @NgaySinh ,111),Email=@Email,DiaChi=@DiaChi,
            SDT=@SDT,AnhDaiDien=@AnhDaiDien,UserName_CapNhat=@UserName_CapNhat,NgayCapNhat=CONVERT(DATETIME, @NgayCapNhat ,120),ID_NhomChucNang=@ID_NhomChucNang
    WHERE ID_NguoiDung = @ID_NguoiDung
END
GO

--Xóa người dùng
CREATE PROC deleteNguoiDung
(@ID_NguoiDung VARCHAR(20))
AS
BEGIN
	DELETE FROM GameDaTai
	WHERE ID_NguoiDung=@ID_NguoiDung

	DELETE FROM BinhLuan
	WHERE ID_NguoiBinhLuan=@ID_NguoiDung

	DELETE FROM YeuThich
	WHERE ID_NguoiDung=@ID_NguoiDung

    DELETE FROM NguoiDung
    WHERE ID_NguoiDung=@ID_NguoiDung
END
GO
--Xem NguoiDung theo ID
CREATE PROC detailNguoiDung
(@ID_NguoiDung VARCHAR(20))
AS
BEGIN
    SELECT* FROM NguoiDung
    WHERE ID_NguoiDung=@ID_NguoiDung
END
GO
--đếm số người dùng
CREATE PROC countNguoiDung
AS
BEGIN
    SELECT COUNT(ID_NguoiDung) FROM NguoiDung
END
GO
--Login
CREATE PROC LoginNguoiDung
(@UserName_ND VARCHAR(50),@Password_ND VARCHAR(200))
AS
BEGIN
    SELECT * FROM NguoiDung WHERE @UserName_ND=UserName_ND AND @Password_ND=Password_ND
END
GO
--get ID bằng name nhóm chức năng
CREATE PROC getIDNameNhomChucNang
(@TenNhomChucNang NVARCHAR(50))
AS
BEGIN
    SELECT ID_NhomChucNang FROM NhomChucNang WHERE TenNhomChucNang = @TenNhomChucNang
END
GO
--get name bằng ID nhóm chức năng
CREATE PROC getNameIDNhomChucNang
(@ID_NhomChucNang VARCHAR(20))
AS
BEGIN
    SELECT TenNhomChucNang FROM NhomChucNang WHERE ID_NhomChucNang = @ID_NhomChucNang
END
GO
--kiểm tra tên người dùng đã tồn tại hay chưa
CREATE PROC checkUserName
(@UserName_ND VARCHAR(50))
AS
BEGIN
    SELECT ID_NguoiDung FROM NguoiDung WHERE UserName_ND = @UserName_ND
END
GO
--Cap quyen admin
CREATE PROC CapQuyenAdmin
(@ID_NguoiDung VARCHAR(20))
AS
BEGIN
    Update NguoiDung Set ID_NhomChucNang = 'NCN2'
    WHERE ID_NguoiDung=@ID_NguoiDung
END
GO
--Huy quyen admin
CREATE PROC HuyQuyenAdmin
(@ID_NguoiDung VARCHAR(20))
AS
BEGIN
    Update NguoiDung Set ID_NhomChucNang = 'NCN3'
    WHERE ID_NguoiDung=@ID_NguoiDung
END
GO
---------------------------------Xem BinhLuan------------------------------------------------------------------
CREATE PROC getBinhLuan
AS
BEGIN
    SELECT* FROM BinhLuan
END
GO
--Thêm BinhLuan
CREATE PROC createBinhLuan
(@DanhGia int,@NoiDungBL NTEXT,@NgayBinhLuan varchar(50),@ID_NguoiBinhLuan VARCHAR(20),@ID_Game INT)
AS
BEGIN
    INSERT INTO BinhLuan(DanhGia,NoiDungBL,NgayBinhLuan,ID_NguoiBinhLuan,ID_Game) VALUES(@DanhGia,@NoiDungBL,CONVERT(DATETIME, @NgayBinhLuan ,120) ,@ID_NguoiBinhLuan,@ID_Game)
END
GO
--Sửa BinhLuan
CREATE PROC editBinhLuan
(@ID_BinhLuan INT,@DanhGia int,@NoiDungBL NVARCHAR(50),@NgayBinhLuan VARCHAR(50),@ID_NguoiBinhLuan VARCHAR(20),@ID_Game INT)
AS
BEGIN
    UPDATE BinhLuan
    SET DanhGia=@DanhGia,NoiDungBL=@NoiDungBL,NgayBinhLuan=CONVERT(DATETIME, @NgayBinhLuan ,120),ID_NguoiBinhLuan=@ID_NguoiBinhLuan,ID_Game=@ID_Game
    WHERE ID_BinhLuan = @ID_BinhLuan
END
GO
--Xóa BinhLuan
CREATE PROC deleteBinhLuan
(@ID_BinhLuan INT)
AS
BEGIN
    DELETE FROM BinhLuan
    WHERE ID_BinhLuan = @ID_BinhLuan
END
GO
--Xem BinhLuan theo ID
CREATE PROC detailBinhLuan
(@ID_BinhLuan INT)
AS
BEGIN
    SELECT* FROM BinhLuan
    WHERE ID_BinhLuan = @ID_BinhLuan
END
GO
--Xem BinhLuan theo ID Game
CREATE PROC getBinhLuanIDGame
(@ID_Game INT)
AS
BEGIN
    SELECT* FROM BinhLuan bl, NguoiDung nd
    WHERE ID_Game = @ID_Game and bl.ID_NguoiBinhLuan = nd.ID_NguoiDung
END
GO
CREATE PROC findBinhLuan
(@ID_Game int, @ID_NguoiDung varchar(20))
AS
BEGIN
	SELECT * FROM BinhLuan WHERE ID_Game = @ID_Game and ID_NguoiBinhLuan = @ID_NguoiDung
END
GO
--count đánh giá
CREATE PROC countDanhGia
(@ID_Game int)
AS
BEGIN
	DECLARE @danhgiaTB float
    SET @danhgiaTB = (SELECT AVG(DanhGia+0.0) FROM BinhLuan WHERE ID_Game = @ID_Game)
	if @danhgiaTB is null
		select 0
	else select @danhgiaTB
END
GO
--check bình luận
CREATE PROC checkBinhLuan
(@ID_Game INT, @ID_NguoiDung varchar(20))
AS
BEGIN
	DECLARE @checkBL int
    SET @checkBL = (SELECT ID_BinhLuan FROM BinhLuan
					WHERE ID_Game = @ID_Game and ID_NguoiBinhLuan = @ID_NguoiDung)
	if @checkBL is null
		select 0
	else select 1
END
GO
-----------------------------------Xem Game------------------------------------------------------------------
CREATE PROC getGame
AS
BEGIN
    SELECT* FROM Game
END
GO
--Thêm Game
CREATE PROC createGame
(@Ten_Game NVARCHAR(200),@Ten_NhaSanXuat NVARCHAR(100),@SoHieuPhienBan INT,@PhienBan VARCHAR(10),
@YC_CauHinh NVARCHAR(50),@LuotTaiXuong int,@DanhGiaTB FLOAT,@GioiHan_Tuoi int,@Gia FLOAT,@MoTaChiTiet ntext,
@UserName_Tao VARCHAR(10),@NgayTao VARCHAR(50),@UserName_CapNhat VARCHAR(10),@NgayCapNhat VARCHAR(50),@Logo_Game NVARCHAR(50), @LinkTaiGame varchar(255))
AS
BEGIN
    INSERT INTO Game(Ten_Game,Ten_NhaSanXuat,SoHieuPhienBan,PhienBan,
                    YC_CauHinh,LuotTaiXuong,DanhGiaTB,GioiHan_Tuoi,Gia,MoTaChiTiet,UserName_Tao,NgayTao,UserName_CapNhat,NgayCapNhat,Logo_Game, LinkTaiGame)
    VALUES(@Ten_Game,@Ten_NhaSanXuat,@SoHieuPhienBan,@PhienBan,
            @YC_CauHinh,@LuotTaiXuong,@DanhGiaTB,@GioiHan_Tuoi,@Gia,@MoTaChiTiet,
            @UserName_Tao,CONVERT(DATETIME, @NgayTao ,120),@UserName_CapNhat,CONVERT(DATETIME, @NgayCapNhat ,120),@Logo_Game, @LinkTaiGame)
END
GO
--Sửa Game
CREATE PROC editGame
(@ID_Game INT,@Ten_Game NVARCHAR(200),@Ten_NhaSanXuat NVARCHAR(100),@SoHieuPhienBan INT,@PhienBan VARCHAR(10),
@YC_CauHinh NVARCHAR(50),@LuotTaiXuong int,@DanhGiaTB FLOAT,@GioiHan_Tuoi int,@Gia FLOAT,@MoTaChiTiet ntext,
@UserName_CapNhat VARCHAR(10),@NgayCapNhat varchar(50),@Logo_Game NVARCHAR(50), @LinkTaiGame varchar(255))
AS
BEGIN
    UPDATE Game
    SET Ten_Game=@Ten_Game,Ten_NhaSanXuat=@Ten_NhaSanXuat,SoHieuPhienBan=@SoHieuPhienBan,PhienBan=@PhienBan,YC_CauHinh=@YC_CauHinh,
    LuotTaiXuong=@LuotTaiXuong,DanhGiaTB=@DanhGiaTB,GioiHan_Tuoi=@GioiHan_Tuoi,Gia=@Gia,MoTaChiTiet=@MoTaChiTiet,
    UserName_CapNhat=@UserName_CapNhat,NgayCapNhat=CONVERT(DATETIME, @NgayCapNhat ,120),Logo_Game=@Logo_Game,LinkTaiGame=@LinkTaiGame
    WHERE ID_Game = @ID_Game
END
GO
--Get link tải game theo id game
CREATE PROC getLinkTaiGame(@ID_Game int)
AS
BEGIN
	Select LinkTaiGame From Game Where ID_Game=@ID_Game
END
GO
--Tăng số lượt tải game
CREATE PROC editGameLuotTai(@ID_Game int)
AS
BEGIN
	UPDATE Game
	Set LuotTaiXuong = LuotTaiXuong+1
	Where ID_Game=@ID_Game
END
GO
--Xóa Game
CREATE PROC deleteGame
(@ID_Game INT)
AS
BEGIN
    DELETE FROM GameDaTai
	WHERE ID_Game = @ID_Game
	
	DELETE FROM YeuThich
	WHERE ID_Game = @ID_Game

	DELETE FROM ChiTietGame
	WHERE ID_Game = @ID_Game

	DELETE FROM HinhAnh
	WHERE ID_Game = @ID_Game

	DELETE FROM BinhLuan
	WHERE ID_Game = @ID_Game

    DELETE FROM Game
    WHERE ID_Game = @ID_Game
END
GO
--Xem Game theo ID
CREATE PROC detailGame
(@ID_Game INT)
AS
BEGIN
    SELECT* FROM Game
    WHERE ID_Game = @ID_Game
END
go
--Tìm id game theo ten
CREATE PROC getIDNameLogo
(@Ten_Game NVARCHAR(50))
AS
BEGIN
    SELECT ID_Game FROM Game
    WHERE Ten_Game = @Ten_Game
END
GO
CREATE PROC editGameDanhGia
(@ID_Game INT,@DanhGiaTB FLOAT)
AS
BEGIN
    UPDATE Game
    SET DanhGiaTB=@DanhGiaTB
    WHERE ID_Game = @ID_Game
END
GO
CREATE PROC findGame
(@keyword NVARCHAR(50))
AS
BEGIN
    select * from Game WHERE Ten_Game like ('%'+@keyword+'%') and KiemDuyet=1
END
GO
--Kiem Duyet Game (danh cho admin)
CREATE PROC KiemDuyet
(@ID_Game INT)
AS
BEGIN
    UPDATE Game Set KiemDuyet = 1 Where @ID_Game = ID_Game
END
go
-- Game cua toi
CREATE PROC getMyGame
(@Username varchar(50))
AS
BEGIN
    SELECT * FROM Game Where UserName_Tao = @Username
END
GO
-- get game da kiem duyet
CREATE PROC getGameDaKiemDuyet
AS
BEGIN
    SELECT * FROM Game Where KiemDuyet = 1
END
go
-- get game chua kiem duyet
CREATE PROC getGameChuaKiemDuyet
AS
BEGIN
    SELECT* FROM Game Where KiemDuyet = 0
END
GO-----------------------------------Xem HinhAnh------------------------------------------------------------------
CREATE PROC getHinhAnh
AS
BEGIN
    SELECT* FROM HinhAnh
END
GO
--Thêm HinhAnh
CREATE PROC createHinhAnh
(@AnhMH NVARCHAR(50),@ID_Game INT)
AS
BEGIN
    INSERT INTO HinhAnh(AnhMH,ID_Game) VALUES(@AnhMH,@ID_Game)
END
GO
--Sửa HinhAnh
CREATE PROC editHinhAnh
(@ID_AnhMH INT, @AnhMH NVARCHAR(50),@ID_Game INT)
AS
BEGIN
    UPDATE HinhAnh
    SET AnhMH=@AnhMH,ID_Game=@ID_Game
    WHERE ID_AnhMH = @ID_AnhMH
END
GO
--Xóa HinhAnh
CREATE PROC deleteHinhAnh
(@ID_AnhMH INT)
AS
BEGIN
    DELETE FROM HinhAnh
    WHERE @ID_AnhMH = ID_AnhMH
END
GO
--Xem HinhAnh theo ID
CREATE PROC detailHinhAnh
(@ID_AnhMH INT)
AS
BEGIN
    SELECT* FROM HinhAnh
    WHERE @ID_AnhMH = @ID_AnhMH
END
GO
--Tìm ảnh theo id game
CREATE PROC getIDHinhAnh
(@ID_Game int)
AS
BEGIN
    SELECT * FROM HinhAnh
    WHERE ID_Game=@ID_Game
END
GO
-----------------------------------Xem TheLoai------------------------------------------------------------------
CREATE PROC getTheLoai
AS
BEGIN
    SELECT* FROM TheLoai
END
GO
--Thêm TheLoai
CREATE PROC createTheLoai
(@TenTheLoai NVARCHAR(50))
AS
BEGIN
    INSERT INTO TheLoai(TenTheLoai) VALUES(@TenTheLoai)
END
GO
--Sửa TheLoai
CREATE PROC editTheLoai
(@ID_Loai INT, @TenTheLoai NVARCHAR(50))
AS
BEGIN
    UPDATE TheLoai
    SET TenTheLoai=@TenTheLoai
    WHERE ID_Loai = @ID_Loai
END
GO
--Xóa TheLoai
CREATE PROC deleteTheLoai
(@ID_Loai INT)
AS
BEGIN
    DELETE FROM TheLoai
    WHERE ID_Loai = @ID_Loai
END
GO
--Xem TheLoai theo ID
CREATE PROC detailTheLoai
(@ID_Loai INT)
AS
BEGIN
    SELECT* FROM TheLoai
    WHERE ID_Loai = @ID_Loai
END
GO
--Xem ID theo tên thể loại
CREATE PROC getIDNameTheLoai
(@TenTheLoai NVARCHAR(50))
AS
BEGIN
    SELECT* FROM TheLoai
    WHERE TenTheLoai = @TenTheLoai
END
GO
-----------------------------------Xem ChiTietGame------------------------------------------------------------------
CREATE PROC getChiTietGame
AS
BEGIN
    SELECT* FROM ChiTietGame
END
GO
--Thêm ChiTietGame
CREATE PROC createChiTietGame
(@ID_Game INT,@ID_Loai INT)
AS
BEGIN
    INSERT INTO ChiTietGame(ID_Game,ID_Loai) VALUES(@ID_Game,@ID_Loai)
END
GO
--Sửa ChiTietGame
CREATE PROC editChiTietGame
(@ID_ChiTietGame INT, @ID_Game INT,@ID_Loai INT)
AS
BEGIN
    UPDATE ChiTietGame
    SET ID_Game=@ID_Game,ID_Loai=@ID_Loai
    WHERE ID_ChiTietGame = @ID_ChiTietGame
END
GO
--Xóa ChiTietGame
CREATE PROC deleteChiTietGame
(@ID_ChiTietGame INT)
AS
BEGIN
    DELETE FROM ChiTietGame
    WHERE ID_ChiTietGame = @ID_ChiTietGame
END
GO
--Xem ChiTietGame theo ID
CREATE PROC detailChiTietGame
(@ID_ChiTietGame INT)
AS
BEGIN
    SELECT* FROM ChiTietGame
    WHERE ID_ChiTietGame = @ID_ChiTietGame
END
GO
--Tìm chi tiết game theo ID game
CREATE PROC ID_GameChiTietGame
(@ID_Game INT)
AS
BEGIN
    SELECT ctg.ID_ChiTietGame,tl.ID_Loai,TenTheLoai FROM ChiTietGame ctg, TheLoai tl
    WHERE ID_Game = @ID_Game and tl.ID_Loai=ctg.ID_Loai
END
GO
--Tìm game theo tên thể loại
CREATE PROC getGamelistIDTheLoai
(@ID_Loai INT)
AS
BEGIN
    SELECT * FROM ChiTietGame ctg, TheLoai tl, Game g
    WHERE ctg.ID_Game = g.ID_Game and tl.ID_Loai=ctg.ID_Loai and tl.ID_Loai=@ID_Loai and g.KiemDuyet=1
END
GO
-----------------------------------Xem GameDaTai------------------------------------------------------------------
CREATE PROC getGameDaTai
AS
BEGIN
    SELECT* FROM GameDaTai
END
GO
--Thêm GameDaTai
CREATE PROC createGameDaTai
(@CapNhat bit,@NgayTai VARCHAR(50), @ID_NguoiDung VARCHAR(20),@ID_Game INT)
AS
BEGIN
    INSERT INTO GameDaTai(CapNhat,NgayTai,ID_NguoiDung,ID_Game) VALUES(@CapNhat,CONVERT(DATETIME, @NgayTai,120),@ID_NguoiDung,@ID_Game)
END
GO

--Sửa GameDaTai
CREATE PROC editGameDaTai
(@ID_GameDaTai INT,@CapNhat bit,@NgayTai varchar(50), @ID_NguoiDung VARCHAR(20),@ID_Game INT)
AS
BEGIN
    UPDATE GameDaTai
    SET CapNhat=@CapNhat,NgayTai=CONVERT(DATETIME, @NgayTai ,120),ID_NguoiDung=@ID_NguoiDung,ID_Game=@ID_Game
    WHERE ID_GameDaTai = @ID_GameDaTai
END
GO

--Xóa GameDaTai
CREATE PROC deleteGameDaTai
(@ID_GameDaTai INT)
AS
BEGIN
    DELETE FROM GameDaTai
    WHERE ID_GameDaTai = @ID_GameDaTai
END
GO
--Xem GameDaTai theo ID
CREATE PROC detailGameDaTai
(@ID_GameDaTai INT)
AS
BEGIN
    SELECT* FROM GameDaTai
    WHERE ID_GameDaTai = @ID_GameDaTai
END
GO
--Get GameDaTai theo ID NguoiDung
CREATE PROC getGameDaTaiIDNguoiDung
(@ID_NguoiDung VARCHAR(20))
AS
BEGIN
    SELECT* FROM GameDaTai gdt, Game g
    WHERE ID_NguoiDung = @ID_NguoiDung and g.ID_Game = gdt.ID_Game
END
GO
CREATE PROC checkGameDaTai
(@ID_NguoiDung VARCHAR(20), @ID_Game int)
AS
BEGIN
    SELECT ID_GameDaTai FROM GameDaTai
    WHERE ID_NguoiDung = @ID_NguoiDung and ID_Game = @ID_Game
END
GO
--count game luot tai ID_Game ------------->>>>
CREATE PROC countGameDaTai
( @ID_Game int)
AS
BEGIN
    SELECT COUNT(*) FROM Game
    WHERE ID_Game = @ID_Game
END
GO
-----------------------------------Xem YeuThich------------------------------------------------------------------
CREATE PROC getYeuThich
AS
BEGIN
    SELECT* FROM YeuThich
END
GO
--Thêm YeuThich
CREATE PROC createYeuThich
(@NgayThich varchar(50),@ID_NguoiDung VARCHAR(20),@ID_Game INT)
AS
BEGIN
    INSERT INTO YeuThich(NgayThich,ID_NguoiDung,ID_Game) VALUES(CONVERT(DATETIME, @NgayThich ,120),@ID_NguoiDung,@ID_Game)
END
GO

--Sửa YeuThich
CREATE PROC editYeuThich
(@ID_YeuThich INT, @NgayThich datetime, @ID_NguoiDung VARCHAR(20),@ID_Game INT)
AS
BEGIN
    UPDATE YeuThich
    SET NgayThich=CONVERT(DATETIME,@NgayThich,120),ID_NguoiDung=@ID_NguoiDung,ID_Game=@ID_Game
    WHERE ID_YeuThich = @ID_YeuThich
END
GO

--Xóa YeuThich
CREATE PROC deleteYeuThich
(@ID_YeuThich INT)
AS
BEGIN
    DELETE FROM YeuThich
    WHERE ID_YeuThich = @ID_YeuThich
END
GO
--Xem YeuThich theo ID
CREATE PROC detailYeuThich
(@ID_YeuThich INT)
AS
BEGIN
    SELECT* FROM YeuThich
    WHERE ID_YeuThich = @ID_YeuThich
END
GO
--Get YeuThich theo ID NguoiDung
CREATE PROC getYeuThichIDNguoiDung
(@ID_NguoiDung VARCHAR(20))
AS
BEGIN
    SELECT* FROM YeuThich yt, Game g
    WHERE ID_NguoiDung = @ID_NguoiDung and yt.ID_Game = g.ID_Game
END
GO
CREATE PROC checkYeuThich
(@ID_NguoiDung VARCHAR(20), @ID_Game int)
AS
BEGIN
    SELECT ID_YeuThich FROM YeuThich
    WHERE ID_NguoiDung = @ID_NguoiDung and ID_Game = @ID_Game
END
GO
-----------------------------------Xem Menu------------------------------------------------------------------
CREATE PROC getMenu
AS
BEGIN
    SELECT* FROM Menu
END
GO
--Thêm Menu
CREATE PROC createMenu
(@TenMenu NVARCHAR(50), @IconMenu NVARCHAR(50), @MoTa ntext, @ID_MenuCha INT)
AS
BEGIN
    INSERT INTO Menu(TenMenu,IconMenu,MoTa,ID_MenuCha) VALUES(@TenMenu, @IconMenu, @MoTa, @ID_MenuCha)
END
GO
--Sửa Menu
CREATE PROC editMenu
(@ID_Menu INT,@TenMenu NVARCHAR(50), @IconMenu NVARCHAR(50), @MoTa ntext, @ID_MenuCha INT)
AS
BEGIN
    UPDATE Menu
    SET TenMenu=@TenMenu,IconMenu=@IconMenu,MoTa=@MoTa,ID_MenuCha=@ID_MenuCha
    WHERE ID_Menu = @ID_Menu
END
GO
--Xóa Menu
CREATE PROC deleteMenu
(@ID_Menu INT)
AS
BEGIN
    DELETE FROM Menu
    WHERE ID_Menu = @ID_Menu
END
GO
--Xem Menu theo ID
CREATE PROC detailMenu
(@ID_Menu INT)
AS
BEGIN
    SELECT* FROM Menu
    WHERE ID_Menu = @ID_Menu
END
GO

--Sap xep theo luot tai
CREATE PROC topLuotTai
AS
BEGIN
    SELECT* FROM Game
	WHERE KiemDuyet=1
    Order by LuotTaiXuong Desc
END
GO
--Sap xep danh gia
CREATE PROC topDanhGia
AS
BEGIN
    SELECT* FROM Game
	WHERE KiemDuyet=1
    Order by DanhGiaTB Desc
END
GO
--Sap xep theo luot tai
CREATE PROC gameFree
AS
BEGIN
    SELECT* FROM Game
    WHERE Gia=0 and KiemDuyet=1
END
GO
--Sap xep theo luot tai
CREATE PROC topGiaTien
AS
BEGIN
    SELECT* FROM Game
	WHERE KiemDuyet=1
    Order by Gia Desc
END
GO



--Recommender Systems-------------------------------------------------------------
CREATE PROC getRateIDNguoiDung
(@ID_NguoiBinhLuan Varchar(20))
AS
BEGIN
    SELECT ID_Game , DanhGia FROM BinhLuan
	Where ID_NguoiBinhLuan = @ID_NguoiBinhLuan
	Order by ID_Game asc
END
GO

CREATE PROC getIDLoai
AS
BEGIN
    SELECT ID_Loai FROM TheLoai
	Order by ID_Loai asc
END
GO

CREATE PROC checkTheLoaiGame
(@id_game int, @id_loai int)
AS
BEGIN
	DECLARE @id int
    SET @id = (select ID_ChiTietGame from ChiTietGame where ID_Game = @id_game and ID_Loai = @id_loai)
	if @id is null
		select 0
	else
		select 1
END
GO

CREATE PROC getFullIDGame
AS
BEGIN
    SELECT ID_Game FROM Game
	WHERE KiemDuyet=1
	Order by ID_Game asc
END
GO

CREATE PROC getFullIDGameDaTai
(@ID_NguoiDung varchar(20))
AS
BEGIN
    SELECT ID_Game FROM GameDaTai
	Where ID_NguoiDung = @ID_NguoiDung
	Order by ID_Game asc
END
GO

--Check so luong binh luan cua nguoi dung
CREATE PROC CountSoBinhLuan
(@ID_NguoiDung varchar(20))
AS
BEGIN
	DECLARE @count int
    SET @count = (SELECT COUNT(*) FROM BinhLuan WHERE ID_NguoiBinhLuan=@ID_NguoiDung)
	IF (@count < 3)
		PRINT 0;
	ELSE PRINT 1;
END
GO
--dem so stored procedures
SELECT COUNT(*) AS TotalCount
FROM sys.procedures