-- CreateTable
CREATE TABLE `absence` (
    `idAbsence` INTEGER NOT NULL AUTO_INCREMENT,
    `dateAbsence` DATE NOT NULL,
    `idCourse` INTEGER NOT NULL,
    `idStudent` INTEGER NOT NULL,

    INDEX `idCourse`(`idCourse`),
    INDEX `idStudent`(`idStudent`),
    PRIMARY KEY (`idAbsence`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `course` (
    `idCourse` INTEGER NOT NULL AUTO_INCREMENT,
    `nameCourse` VARCHAR(255) NOT NULL,
    `idTeacher` INTEGER NOT NULL,
    `idProgramGroup` INTEGER NOT NULL,

    INDEX `idProgramGroup`(`idProgramGroup`),
    INDEX `idTeacher`(`idTeacher`),
    PRIMARY KEY (`idCourse`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `program` (
    `idProgram` INTEGER NOT NULL AUTO_INCREMENT,
    `nameProgram` VARCHAR(255) NOT NULL,
    `idProgramType` INTEGER NOT NULL,
    `isApprendiceship` BOOLEAN NOT NULL,

    INDEX `idProgramType`(`idProgramType`),
    PRIMARY KEY (`idProgram`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `programgroup` (
    `idProgramGroup` INTEGER NOT NULL AUTO_INCREMENT,
    `levelProgramGroup` INTEGER NOT NULL,
    `nameProgramGroup` VARCHAR(255) NOT NULL,
    `idProgram` INTEGER NOT NULL,

    INDEX `idProgram`(`idProgram`),
    PRIMARY KEY (`idProgramGroup`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `programtype` (
    `idProgramType` INTEGER NOT NULL AUTO_INCREMENT,
    `nameProgramType` VARCHAR(255) NULL,

    PRIMARY KEY (`idProgramType`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rating` (
    `idRating` INTEGER NOT NULL AUTO_INCREMENT,
    `ratingValue` DECIMAL(3, 1) NULL,
    `idStudent` INTEGER NOT NULL,
    `idCourse` INTEGER NOT NULL,

    INDEX `idCourse`(`idCourse`),
    INDEX `idStudent`(`idStudent`),
    PRIMARY KEY (`idRating`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `schedule` (
    `idSchedule` INTEGER NOT NULL AUTO_INCREMENT,
    `scheduleDay` DATE NULL,
    `scheduleStartTime` TIME(0) NULL,
    `scheduleEndTime` TIME(0) NULL,
    `idCourse` INTEGER NOT NULL,

    INDEX `idCourse`(`idCourse`),
    PRIMARY KEY (`idSchedule`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `student` (
    `idStudent` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(255) NULL,
    `lastName` VARCHAR(255) NULL,
    `idProgramGroup` INTEGER NOT NULL,

    INDEX `idProgramGroup`(`idProgramGroup`),
    PRIMARY KEY (`idStudent`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `teacher` (
    `idTeacher` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(255) NULL,
    `lastName` VARCHAR(255) NULL,

    PRIMARY KEY (`idTeacher`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `absence` ADD CONSTRAINT `absence_ibfk_1` FOREIGN KEY (`idCourse`) REFERENCES `course`(`idCourse`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `absence` ADD CONSTRAINT `absence_ibfk_2` FOREIGN KEY (`idStudent`) REFERENCES `student`(`idStudent`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `course` ADD CONSTRAINT `course_ibfk_1` FOREIGN KEY (`idTeacher`) REFERENCES `teacher`(`idTeacher`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `course` ADD CONSTRAINT `course_ibfk_2` FOREIGN KEY (`idProgramGroup`) REFERENCES `programgroup`(`idProgramGroup`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `program` ADD CONSTRAINT `program_ibfk_1` FOREIGN KEY (`idProgramType`) REFERENCES `programtype`(`idProgramType`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `programgroup` ADD CONSTRAINT `programgroup_ibfk_1` FOREIGN KEY (`idProgram`) REFERENCES `program`(`idProgram`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `rating` ADD CONSTRAINT `rating_ibfk_1` FOREIGN KEY (`idStudent`) REFERENCES `student`(`idStudent`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `rating` ADD CONSTRAINT `rating_ibfk_2` FOREIGN KEY (`idCourse`) REFERENCES `course`(`idCourse`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `schedule` ADD CONSTRAINT `schedule_ibfk_1` FOREIGN KEY (`idCourse`) REFERENCES `course`(`idCourse`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `student` ADD CONSTRAINT `student_ibfk_1` FOREIGN KEY (`idProgramGroup`) REFERENCES `programgroup`(`idProgramGroup`) ON DELETE RESTRICT ON UPDATE RESTRICT;

